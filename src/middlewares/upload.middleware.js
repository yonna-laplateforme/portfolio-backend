import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from '../utils/cloudinary.js';

const createStorage = (folderName, resourceType = 'image') => {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: folderName,
      resource_type: resourceType,

      ...(resourceType === 'image' && {
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        format: 'webp',
        transformation: [
          {
            quality: 'auto',
            fetch_format: 'webp',
          },
        ],
      }),

      ...(resourceType === 'video' && {
        resource_type: 'video',
        format: 'mp4',
      }),
    },
  });
};

export const uploadImage = multer({
  storage: createStorage('portfolio_uploads', 'image'),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const uploadVideo = multer({
  storage: createStorage('portfolio_videos', 'video'),
  limits: {
    fileSize: 200 * 1024 * 1024,
  },
});