import * as HomeService from '../services/home.service.js';

export const getHomeContent = async (req, res) => {
  try {
   const content = await HomeService.getHomeContent();
    res.json(content);
  } catch (error) {
    console.error('Erreur getHomeContent :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const updateHomeContent = async (req, res) => {
  try {
    const updateData = { ...req.body };

    const shouldRemoveVideo =
      req.body.removeVideo === true || req.body.removeVideo === 'true';
    delete updateData.removeVideo;

    if (shouldRemoveVideo) {
      updateData.video_url = null;
    } else {
      delete updateData.video_url;
    }

    const result = await HomeService.updateHomeContent(updateData);

    res.json({ message: 'Mise à jour réussie', result });
  } catch (error) {
    console.error('Erreur updateHomeContent :', error);
    res.status(400).json({ message: error.message });
  }
};

export const uploadHomeVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier vidéo reçu' });
    }

    const videoUrl = req.file.path;
    await HomeService.updateVideoUrl(videoUrl);

    res.json({ videoUrl });
  } catch (error) {
    console.error('ERREUR UPLOAD VIDÉO HOME :', error);
    res.status(500).json({ message: 'Erreur upload vidéo', details: error.message });
  }
};

export const uploadHomePoster = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier reçu par le serveur' });
    }

    const posterUrl = req.file.path;
    await HomeService.updatePosterUrl(posterUrl);

    res.json({ posterUrl });
  } catch (error) {
    console.error('ERREUR UPLOAD POSTER HOME :', error);
    res.status(500).json({ message: 'Erreur upload', details: error.message });
  }
};