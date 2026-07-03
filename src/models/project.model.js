import db from '../config/db.js'
import { sanitizeFeaturedValue } from '../utils/project.utils.js';

// LISTE DES COLONNES 
const PROJECT_COLUMNS = `
    p.id, p.title, p.description, p.github_url, p.demo_url, 
    p.client, p.role, p.date_realisation, p.visibility, p.isFeatured, p.category_id
`;

export const findForHome = async () => {
    const query = `
        SELECT ${PROJECT_COLUMNS}, c.name AS category, 
               GROUP_CONCAT(DISTINCT ph.url SEPARATOR ',') AS image_url,
               GROUP_CONCAT(DISTINCT t.name SEPARATOR ',') AS technologies
        FROM project p
        LEFT JOIN category c ON p.category_id = c.id
        LEFT JOIN photo ph ON p.id = ph.project_id
        LEFT JOIN project_technology pt ON p.id = pt.project_id
        LEFT JOIN technology t ON pt.technology_id = t.id
        WHERE p.isFeatured = 1
        GROUP BY p.id
        ORDER BY p.created_at DESC
    `;
    const [rows] = await db.execute(query);
    return rows;
};

export const findAll = async () => {
    const query = `
        SELECT ${PROJECT_COLUMNS}, c.name AS category, 
               GROUP_CONCAT(DISTINCT ph.url SEPARATOR ',') AS image_url,
               GROUP_CONCAT(DISTINCT t.name SEPARATOR ',') AS technologies
        FROM project p
        LEFT JOIN category c ON p.category_id = c.id
        LEFT JOIN photo ph ON p.id = ph.project_id
        LEFT JOIN project_technology pt ON p.id = pt.project_id
        LEFT JOIN technology t ON pt.technology_id = t.id
        GROUP BY p.id
        ORDER BY p.created_at DESC
    `;
    const [rows] = await db.execute(query);
    return rows;
};

export const findById = async (id) => {
    const query = `
        SELECT ${PROJECT_COLUMNS}, c.name AS category, 
               GROUP_CONCAT(DISTINCT ph.url SEPARATOR ',') AS image_url,
               GROUP_CONCAT(DISTINCT t.name SEPARATOR ',') AS technologies
        FROM project p
        LEFT JOIN category c ON p.category_id = c.id
        LEFT JOIN photo ph ON p.id = ph.project_id
        LEFT JOIN project_technology pt ON p.id = pt.project_id
        LEFT JOIN technology t ON pt.technology_id = t.id
        WHERE p.id = ?
        GROUP BY p.id
    `;
    const [rows] = await db.execute(query, [id]);
    return rows[0] ?? null;
};

/**
 * Crée un nouveau projet, ses images et ses technologies.
 */
export const create = async (data) => {
    
    const {
        title, description, technologies, github_url, demo_url, image_urls,
        client, role, date_realisation, visibility, isFeatured, category_id
    } = data;
    
    const featuredValue = sanitizeFeaturedValue(isFeatured);

    // 1. On insère le projet principal
    const [result] = await db.execute(
        `INSERT INTO project 
        (title, description, github_url, demo_url, client, role, date_realisation, visibility, isFeatured, category_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            title, description || null, github_url || null, demo_url || null,
            client || null, role || null, date_realisation || null,
            visibility || 'Publié', featuredValue, category_id || null
        ]
    );

    const newProjectId = result.insertId;

    // 2. On insère toutes les images
    if (image_urls && image_urls.length > 0) {
        for (const url of image_urls) {
            await db.execute(
                'INSERT INTO photo (project_id, url) VALUES (?, ?)', 
                [newProjectId, url]
            );
        }
    }

    // 3. NOUVEAU : On insère les liaisons Many-to-Many pour les technologies
    if (technologies && technologies.length > 0) {
        for (const techId of technologies) {
            await db.execute(
                'INSERT INTO project_technology (project_id, technology_id) VALUES (?, ?)', 
                [newProjectId, techId]
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
        title, description, technologies, github_url, demo_url, image_urls,
        client, role, date_realisation, visibility, isFeatured, category_id
    } = data;

    let finalIsFeatured = currentProject.isFeatured;
    if (isFeatured !== undefined) {
        finalIsFeatured = sanitizeFeaturedValue(isFeatured);
    }

    // 1. Mise à jour de la table 'project'
    const [result] = await db.execute(
        `UPDATE project SET 
            title = ?, description = ?, github_url = ?, demo_url = ?,
            client = ?, role = ?, date_realisation = ?, visibility = ?, isFeatured = ? ,
            category_id = ?
        WHERE id = ?`,
        [
            title || currentProject.title,
            description || currentProject.description,
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

    // 2. Remplacement des images
    if (image_urls && image_urls.length > 0) {
        await db.execute('DELETE FROM photo WHERE project_id = ?', [id]);
        for (const url of image_urls) {
            await db.execute('INSERT INTO photo (project_id, url) VALUES (?, ?)', [id, url]);
        }
    }

    // 3.Remplacement des technologies
    if (technologies !== undefined) {
        // On supprime les anciennes liaisons
        await db.execute('DELETE FROM project_technology WHERE project_id = ?', [id]);
        
        // On recrée les nouvelles si on en a reçu
        if (technologies.length > 0) {
            for (const techId of technologies) {
                await db.execute(
                    'INSERT INTO project_technology (project_id, technology_id) VALUES (?, ?)', 
                    [id, techId]
                );
            }
        }
    }

    return result.affectedRows > 0;
};

/**
 * Supprime un projet.
 */
export const remove = async (id) => {
    // Les photos ET les liaisons project_technology seront supprimées automatiquement (ON DELETE CASCADE)
    const [result] = await db.execute('DELETE FROM project WHERE id = ?', [id]);
    return result.affectedRows > 0;
};