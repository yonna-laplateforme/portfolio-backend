import db from '../config/db.js'; // Ton fichier de pool de connexion

const aboutModel = {
  // Récupérer le contenu
  getAboutContent: async () => {
    const [rows] = await db.execute('SELECT * FROM about_content LIMIT 1');
    return rows[0];
  },

  // Mettre à jour le texte
  updateAboutContent: async (data) => {
    const sql = `UPDATE about_content SET 
      header_title = ?, header_subtitle = ?, bio_text = ?, 
      philosophy_quote = ?, philosophy_author = ?, expertises_json = ?`;
    await db.execute(sql, [
      data.header_title, data.header_subtitle, data.bio_text, 
      data.philosophy_quote, data.philosophy_author, data.expertises_json
    ]);
  },

  // Mettre à jour la photo
  updatePhotoUrl: async (photoUrl) => {
    await db.execute('UPDATE about_content SET photo_url = ?', [photoUrl]);
  }
};

export default aboutModel;