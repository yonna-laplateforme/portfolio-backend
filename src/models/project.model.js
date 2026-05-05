import db from "../config/db.js";

/**
 * RÉCUPÉRER TOUS LES PROJETS
 */
export const findAll = async () => {
    
    const sql = "SELECT * FROM projects ORDER BY created_at DESC";
    const [rows] = await db.query(sql);
    return rows;
};

/**
 * RÉCUPÉRER UN PROJET PAR SON ID
 */
export const findById = async (id) => {
    const sql = "SELECT * FROM projects WHERE id = ?";
    const [rows] = await db.query(sql, [id]);
    return rows[0] || null;
};

/**
 * CRÉER 
 */
export const create = async (projectData) => {
    const { title, description, tech_stack, github_url, demo_url, image_url } = projectData;
    
    const sql = `
        INSERT INTO projects (title, description, tech_stack, github_url, demo_url, image_url) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await db.query(sql, [
        title, 
        description, 
        tech_stack, 
        github_url, 
        demo_url, 
        image_url
    ]);
    
    return result.insertId;
};

/**
 * METTRE À JOUR 
 */
export const update = async (id, projectData) => {
    const { title, description, tech_stack, github_url, demo_url, image_url } = projectData;

    const sql = `
        UPDATE projects 
        SET title = ?, description = ?, tech_stack = ?, github_url = ?, demo_url = ?, image_url = ? 
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [
        title, 
        description, 
        tech_stack, 
        github_url, 
        demo_url, 
        image_url, 
        id
    ]);
    
    return result.affectedRows > 0;
};

/**
 * SUPPRIMER 
 */
export const supp = async (id) => {
    const sql = "DELETE FROM projects WHERE id = ?";
    const [result] = await db.query(sql, [id]);
    return result.affectedRows > 0;
};