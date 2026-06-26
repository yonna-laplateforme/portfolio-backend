import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// 1. Configuration de Cloudinary (Assure-toi d'avoir ces variables dans ton .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configuration du stockage Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio_uploads', // Le nom du dossier qui sera créé sur ton compte Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'], // Remplace ton ancien fileFilter
    // transformation: [{ width: 1920, crop: 'limit' }] // Optionnel : Redimensionnement automatique pour éviter les images trop lourdes
  },
});

// 3. Initialisation de Multer avec Cloudinary
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5Mo par image
});

export default upload;