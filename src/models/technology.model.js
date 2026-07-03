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