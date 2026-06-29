import db from '../config/db.js'
import { sanitizeFeaturedValue } from '../utils/project.utils.js';


import db from '../config/db.js'
import { sanitizeFeaturedValue } from '../utils/project.utils.js';

// LISTE DES COLONNES POUR UNIFORMISER
const PROJECT_COLUMNS = `
    p.id, p.title, p.description, p.tech_stack, p.github_url, p.demo_url, 
    p.client, p.role, p.date_realisation, p.visibility, p.isFeatured, p.category_id
`;

export const findForHome = async () => {
    const query = `
        SELECT ${PROJECT_COLUMNS}, c.name AS category, GROUP_CONCAT(ph.url SEPARATOR ',') AS image_url
        FROM project p
        LEFT JOIN category c ON p.category_id = c.id
        LEFT JOIN photo ph ON p.id = ph.project_id
        WHERE p.isFeatured = 1
        GROUP BY p.id
        ORDER BY p.created_at DESC
    `;
    const [rows] = await db.execute(query);
    return rows;
};

export const findAll = async () => {
    const query = `
        SELECT ${PROJECT_COLUMNS}, c.name AS category, GROUP_CONCAT(ph.url SEPARATOR ',') AS image_url
        FROM project p
        LEFT JOIN category c ON p.category_id = c.id
        LEFT JOIN photo ph ON p.id = ph.project_id
        GROUP BY p.id
        ORDER BY p.created_at DESC
    `;
    const [rows] = await db.execute(query);
    return rows;
};

export const findById = async (id) => {
    const query = `
        SELECT ${PROJECT_COLUMNS}, c.name AS category, GROUP_CONCAT(ph.url SEPARATOR ',') AS image_url
        FROM project p
        LEFT JOIN category c ON p.category_id = c.id
        LEFT JOIN photo ph ON p.id = ph.project_id
        WHERE p.id = ?
        GROUP BY p.id
    `;
    const [rows] = await db.execute(query, [id]);
    return rows[0] ?? null;
};
/**
 * Crée un nouveau projet et ses images.
 */
export const create = async (data) => {
    // Attention : on utilise 'category_id' au lieu de 'category'
    // et 'image_urls' (tableau) au lieu de 'image_url' (string)
    const {
        title, description, tech_stack, github_url, demo_url, image_urls,
        client, role, date_realisation, visibility, isFeatured, category_id
    } = data;
    
    const featuredValue = sanitizeFeaturedValue(isFeatured);

    // 1. On insère le projet principal
    const [result] = await db.execute(
        `INSERT INTO project 
        (title, description, tech_stack, github_url, demo_url, client, role, date_realisation, visibility, isFeatured, category_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            title,
            description || null,
            tech_stack || null,
            github_url || null,
            demo_url || null,
            client || null,
            role || null,
            date_realisation || null,
            visibility || 'Publié',
            featuredValue,
            category_id || null
        ]
    );

    const newProjectId = result.insertId;

    // 2. On insère toutes les images dans la table 'photo'
    if (image_urls && image_urls.length > 0) {
        for (const url of image_urls) {
            await db.execute(
                'INSERT INTO photo (project_id, url) VALUES (?, ?)', 
                [newProjectId, url]
            );
        }
    }

    return await findById(newProjectId);
};

/**
 * Met à jour un projet existant.
 */
export const update = async (id, data) => {
    const currentProject = await findById(id);
    if (!currentProject) return false;

    const {
        title, description, tech_stack, github_url, demo_url, image_urls,
        client, role, date_realisation, visibility, isFeatured, category_id
    } = data;

    let finalIsFeatured = currentProject.isFeatured;
    if (isFeatured !== undefined) {
        finalIsFeatured = sanitizeFeaturedValue(isFeatured);
    }

    // 1. Mise à jour de la table 'project'
    const [result] = await db.execute(
        `UPDATE project SET 
            title = ?, description = ?, tech_stack = ?, github_url = ?, demo_url = ?,
            client = ?, role = ?, date_realisation = ?, visibility = ?, isFeatured = ? ,
            category_id = ?
        WHERE id = ?`,
        [
            title || currentProject.title,
            description || currentProject.description,
            tech_stack || currentProject.tech_stack,
            github_url !== undefined ? github_url : currentProject.github_url,
            demo_url !== undefined ? demo_url : currentProject.demo_url,
            client !== undefined ? client : currentProject.client,
            role !== undefined ? role : currentProject.role,
            date_realisation !== undefined ? date_realisation : currentProject.date_realisation,
            visibility || currentProject.visibility,
            finalIsFeatured,
            category_id !== undefined ? category_id : currentProject.category_id,
            id,
        ]
    );

    // 2. Remplacement des images si de nouvelles images sont uploadées
    if (image_urls && image_urls.length > 0) {
        // Optionnel mais recommandé : on supprime les anciennes photos pour ce projet
        await db.execute('DELETE FROM photo WHERE project_id = ?', [id]);
        
        // On insère les nouvelles
        for (const url of image_urls) {
            await db.execute(
                'INSERT INTO photo (project_id, url) VALUES (?, ?)', 
                [id, url]
            );
        }
    }

    return result.affectedRows > 0;
};

/**
 * Supprime un projet.
 */
export const remove = async (id) => {
    // Les photos liées seront supprimées automatiquement grâce à ON DELETE CASCADE
    const [result] = await db.execute('DELETE FROM project WHERE id = ?', [id]);
    return result.affectedRows > 0;
};