import * as AboutService from '../services/about.service.js';

export const getAboutContent = async (req, res) => {
  try {
    const content = await AboutService.getAboutContent();
    res.json(content);
  } catch (error) {
    console.error('Erreur getAboutContent :', error);

    res.status(500).json({
      message: 'Erreur serveur',
    });
  }
};

export const updateAboutContent = async (req, res) => {
  try {
    const updateData = { ...req.body };

    const shouldRemoveVideo =
      req.body.removeVideo === true ||
      req.body.removeVideo === 'true';

    delete updateData.removeVideo;

    if (shouldRemoveVideo) {
      updateData.video_url = null;
    } else {
      delete updateData.video_url;
    }

    const result = await AboutService.updateAboutContent(updateData);

    res.json({
      message: 'Mise à jour réussie',
      result,
    });
  } catch (error) {
    console.error('Erreur updateAboutContent :', error);

    res.status(400).json({
      message: error.message,
    });
  }
};

export const uploadAboutPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'Aucun fichier reçu par le serveur',
      });
    }

    console.log('Fichier traité par Cloudinary :', req.file);

    const photoUrl = req.file.path;

    await AboutService.updatePhotoUrl(photoUrl);

    res.json({
      photoUrl,
    });
  } catch (error) {
    console.error(
      'ERREUR DÉTAILLÉE DANS LE CONTRÔLEUR :',
      error
    );

    res.status(500).json({
      message: 'Erreur upload',
      details: error.message,
    });
  }
};

export const uploadAboutVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'Aucun fichier vidéo reçu',
      });
    }

    console.log('Vidéo traitée par Cloudinary :', req.file);

    const videoUrl = req.file.path;

    await AboutService.updateVideoUrl(videoUrl);

    res.json({
      videoUrl,
    });
  } catch (error) {
    console.error('ERREUR DÉTAILLÉE VIDÉO :', error);

    res.status(500).json({
      message: 'Erreur upload vidéo',
      details: error.message,
    });
  }
};