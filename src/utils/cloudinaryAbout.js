import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio_about', // Dossier dédié pour tes infos 'À propos'
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    format: 'webp',
    transformation: [
        { width: 500, height: 500, crop: 'fill', gravity: 'face', quality: 'auto', fetch_format: 'webp' }
    ]
  },
});

const uploadAbout = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 2 Mo suffisent pour une photo de profil
});

export default uploadAbout;