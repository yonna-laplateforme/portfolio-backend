import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import 'dotenv/config';

// Connexion à Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuration du stockage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio_projects',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    format: 'webp', 
    transformation: [
        { width: 800, height: 600, crop: 'limit', quality: 'auto', fetch_format: 'webp' }
    ]
  },
});


 const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 Mo maximum
  }
 });
export default upload;