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

export const uploadAboutVideo = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Aucun fichier vidéo reçu" });
        }
        
        console.log("Vidéo traitée par Cloudinary :", req.file);
        
        const videoUrl = req.file.path;
       
        await AboutService.updateVideoUrl(videoUrl);
        
        res.json({ videoUrl });
    } catch (error) {
        console.error("ERREUR DÉTAILLÉE VIDÉO :", error);
        res.status(500).json({ message: "Erreur upload vidéo", details: error.message });
    }
};