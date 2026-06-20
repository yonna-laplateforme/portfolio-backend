import db from '../config/db.js';

/**
 * Récupère tous les projets, du plus récent au plus ancien.
 */
export const findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM project ORDER BY created_at DESC');
    return rows;
};

/**
 * Récupère un projet spécifique par son ID.
 */
export const findById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM project WHERE id = ?', [id]);
    return rows[0] ?? null;
};

/**
 * Crée un nouveau projet.
 */
export const create = async (data) => {
    const { 
        title, description, tech_stack, github_url, demo_url, image_url,
        client, role, date_realisation, visibility, isFeatured 
    } = data;
    
    // Conversion sécurisée en TINYINT (1 ou 0)
    const featuredValue = (isFeatured == 1 || isFeatured === 'true' || isFeatured === true) ? 1 : 0;
    
    const [result] = await db.execute(
        `INSERT INTO project 
        (title, description, tech_stack, github_url, demo_url, image_url, client, role, date_realisation, visibility, isFeatured) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            title, 
            description || null, 
            tech_stack || null, 
            github_url || null, 
            demo_url || null,   
            image_url || null,
            client || null,
            role || null,
            date_realisation || null,
            visibility || 'Publié',
            featuredValue
        ]
    );
    
    return await findById(result.insertId);
};

/**
 * Met à jour un projet existant.
 */
export const update = async (id, data) => {
    const currentProject = await findById(id);
    if (!currentProject) return false;

    const { 
        title, description, tech_stack, github_url, demo_url, image_url,
        client, role, date_realisation, visibility, isFeatured 
    } = data;

    // Gestion des valeurs : priorité aux nouvelles données, sinon on garde l'existante
    const finalImageUrl = image_url || currentProject.image_url;
    
    // Dans src/models/project.model.js, modifie la logique de isFeatured :
let finalIsFeatured = currentProject.isFeatured;
if (isFeatured !== undefined) {
    // On accepte '1', 1, true, 'true' comme étant 1. Le reste est 0.
    finalIsFeatured = (isFeatured == 1 || isFeatured === 'true' || isFeatured === true) ? 1 : 0;
}
    

    const [result] = await db.execute(
        `UPDATE project SET 
            title = ?, description = ?, tech_stack = ?, github_url = ?, demo_url = ?, image_url = ?,
            client = ?, role = ?, date_realisation = ?, visibility = ?, isFeatured = ? 
        WHERE id = ?`,
        [
            title || currentProject.title, 
            description || currentProject.description, 
            tech_stack || currentProject.tech_stack, 
            github_url !== undefined ? github_url : currentProject.github_url, 
            demo_url !== undefined ? demo_url : currentProject.demo_url, 
            finalImageUrl, 
            client !== undefined ? client : currentProject.client,
            role !== undefined ? role : currentProject.role,
            date_realisation !== undefined ? date_realisation : currentProject.date_realisation,
            visibility || currentProject.visibility,
            finalIsFeatured,
            id
        ]
    );
    
    return result.affectedRows > 0;
};

/**
 * Supprime un projet.
 */
export const remove = async (id) => {
    const [result] = await db.execute('DELETE FROM project WHERE id = ?', [id]);
    return result.affectedRows > 0;
};