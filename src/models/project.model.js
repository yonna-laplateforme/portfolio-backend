import db from '../config/db.js'
import { sanitizeFeaturedValue } from '../utils/project.utils.js';

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
        client, role, date_realisation, visibility, isFeatured, category
    } = data;

    
    const featuredValue = sanitizeFeaturedValue(isFeatured);

    const [result] = await db.execute(
        `INSERT INTO project 
        (title, description, tech_stack, github_url, demo_url, image_url, client, role, date_realisation, visibility, isFeatured, category) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
            featuredValue,
            category || null
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
        client, role, date_realisation, visibility, isFeatured, category
    } = data;

    const finalImageUrl = image_url || currentProject.image_url;

    // ✨ ICI AUSSI : C'est beaucoup plus propre avec ta fonction !
    let finalIsFeatured = currentProject.isFeatured;
    if (isFeatured !== undefined) {
        finalIsFeatured = sanitizeFeaturedValue(isFeatured);
    }

    const [result] = await db.execute(
        `UPDATE project SET 
            title = ?, description = ?, tech_stack = ?, github_url = ?, demo_url = ?, image_url = ?,
            client = ?, role = ?, date_realisation = ?, visibility = ?, isFeatured = ? ,
            category = ?
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
            category || currentProject.category,
            id,
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