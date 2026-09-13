import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from '../utils/cloudinary.js';

const createStorage = (folderName, resourceType = 'image') => {
  return new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
      // 🎬 GIF animé : on ne touche à RIEN (sinon l'animation meurt)
      if (file.mimetype === 'image/gif') {
        return {
          folder: folderName,
          resource_type: 'image',
          allowed_formats: ['gif'],
        };
      }

      // 🖼️ Images classiques : optimisation webp qualité auto
      if (resourceType === 'image') {
        return {
          folder: folderName,
          resource_type: 'image',
          allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
          format: 'webp',
          transformation: [{ quality: 'auto', fetch_format: 'webp' }],
        };
      }

      // 🎥 Vidéos
      return {
        folder: folderName,
        resource_type: 'video',
      };
    },
  });
};

export const uploadImage = multer({
  storage: createStorage('portfolio_uploads', 'image'),
  limits: { fileSize: 15 * 1024 * 1024 },
});

export const uploadVideo = multer({
  storage: createStorage('portfolio_videos', 'video'),
  limits: { fileSize: 200 * 1024 * 1024 },
});