import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from '../utils/cloudinary.js';

// Un seul storage qui gère les 3 cas, selon le type de chaque fichier
const mediaParams = (folderImages, folderVideos) => (req, file) => {
  // 🎥 Vidéo → Cloudinary en resource_type video
  if (file.mimetype.startsWith('video/')) {
    return {
      folder: folderVideos,
      resource_type: 'video',
      allowed_formats: ['mp4', 'webm', 'mov'],
    };
  }
  // 🎬 GIF animé : intact
  if (file.mimetype === 'image/gif') {
    return { folder: folderImages, resource_type: 'image', allowed_formats: ['gif'] };
  }
  // 🖼️ Image : optimisation webp
  return {
    folder: folderImages,
    resource_type: 'image',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    format: 'webp',
    transformation: [{ quality: 'auto', fetch_format: 'webp' }],
  };
};

const createMediaStorage = () =>
  new CloudinaryStorage({
    cloudinary,
    params: mediaParams('portfolio_uploads', 'portfolio_videos'),
  });

export const uploadImage = multer({
  storage: createMediaStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
});

// 🎬 Pour les projets : images + GIF + VIDEOS (limite généreuse)
export const uploadProjectMedia = multer({
  storage: createMediaStorage(),
  limits: { fileSize: 150 * 1024 * 1024 },
});

export const uploadVideo = multer({
  storage: createMediaStorage(),
  limits: { fileSize: 200 * 1024 * 1024 },
});