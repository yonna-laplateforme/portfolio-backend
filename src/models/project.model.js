import db from '../config/db.js';

export const findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM projects ORDER BY created_at DESC');
    return rows;
};

export const findById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM projects WHERE id = ?', [id]);
    // rows est un tableau, on retourne le premier élément ou null
    return rows[0] || null;
};

export const create = async (data) => {
    const { title, description, tech_stack, github_url, demo_url, image_url } = data;
    
    const [result] = await db.execute(
        'INSERT INTO projects (title, description, tech_stack, github_url, demo_url, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        [title, description, tech_stack, github_url, demo_url, image_url]
    );
    
   
    return await findById(result.insertId);
};


export const update = async (id, data) => {
  const { title, description, tech_stack, github_url, demo_url, image_url } = data;
  const [result] = await db.execute(
    'UPDATE projects SET title = ?, description = ?, tech_stack = ?, github_url = ?, demo_url = ?, image_url = ? WHERE id = ?',
    [title, description, tech_stack, github_url, demo_url, image_url, id]
  );
  
  // Retourne true si au moins une ligne a été modifiée, sinon false
  return result.affectedRows > 0;
};

export const remove = async (id) => {
  const [result] = await db.execute('DELETE FROM projects WHERE id = ?', [id]);
  
  // Retourne true si une ligne a été supprimée, sinon false
  return result.affectedRows > 0;
};