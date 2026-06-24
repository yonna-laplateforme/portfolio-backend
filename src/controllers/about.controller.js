import * as AboutService from '../services/about.service.js';

export const getAboutContent = async (req, res) => {
    try {
        const content = await AboutService.getAboutContent();
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

export const updateAboutContent = async (req, res) => {
    try {
        const result = await AboutService.updateAboutContent(req.body);
        res.json({ message: "Mise à jour réussie", result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// C'est celle-ci qui manquait ou était mal nommée !
export const uploadAboutPhoto = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Aucun fichier reçu par le serveur" });
        }
        
        // Log important pour déboguer le contenu renvoyé par Cloudinary
        console.log("Fichier traité par Cloudinary :", req.file);
        
        const photoUrl = req.file.path;
        await AboutService.updatePhotoUrl(photoUrl);
        res.json({ photoUrl });
    } catch (error) {
        // AFFICHE L'ERREUR DANS LE TERMINAL
        console.error("ERREUR DÉTAILLÉE DANS LE CONTRÔLEUR :", error);
        res.status(500).json({ message: "Erreur upload", details: error.message });
    }

};