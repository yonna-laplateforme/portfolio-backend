import aboutModel from '../models/about.model.js';

const aboutController = {
  getAboutContent: async (req, res, next) => {
    try {
      const content = await aboutModel.getAboutContent();
      
      if (!content) {
        return res.status(404).json({ message: "Contenu introuvable" });
      }

      // Gestion de la conversion JSON pour expertises
      content.expertises = content.expertises_json ? JSON.parse(content.expertises_json) : [];
      
      res.status(200).json(content);
    } catch (error) {
      next(error);
    }
  },

  updateAboutContent: async (req, res, next) => {
    try {
      const data = {
        header_title: req.body.header_title,
        header_subtitle: req.body.header_subtitle,
        bio_text: req.body.bio_text,
        philosophy_quote: req.body.philosophy_quote,
        philosophy_author: req.body.philosophy_author,
        expertises_json: req.body.expertises ? JSON.stringify(req.body.expertises) : null
      };
      
      await aboutModel.updateAboutContent(data);
      res.status(200).json({ message: "Contenu mis à jour avec succès" });
    } catch (error) {
      next(error);
    }
  },

  uploadAboutPhoto: async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Aucune image fournie" });
      }

      const photoUrl = `/uploads/${req.file.filename}`;
      await aboutModel.updatePhotoUrl(photoUrl);
      
      res.status(200).json({ 
        message: "Photo mise à jour avec succès", 
        photoUrl 
      });
    } catch (error) {
      next(error);
    }
  }
};

export default aboutController;