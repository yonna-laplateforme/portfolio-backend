import db from '../config/db.js';

/**
 * RÉCUPÉRER TOUTES LES TECHNOLOGIES
 */
export const findAll = async () => {
    // On trie par ordre alphabétique pour que ce soit plus joli côté front
    const query = 'SELECT * FROM technology ORDER BY name ASC';
    const [rows] = await db.execute(query);
    return rows;
};

export const create = async (name) => {
    const query = 'INSERT INTO technology (name) VALUES (?)';
    const [result] = await db.execute(query, [name]);
    // On retourne l'objet avec l'ID généré pour que le front puisse l'utiliser immédiatement
    return { id: result.insertId, name };
};