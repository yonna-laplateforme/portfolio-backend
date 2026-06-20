

import db from '../config/db.js';

export const findByEmail = async (email) => {
  // On utilise une requête paramétrée pour éviter les injections SQL
  const [rows] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);
  
  // Retourne le premier utilisateur trouvé ou null
  return rows[0] || null;
};