import multer from 'multer';
import path from 'path';

// On définit où on stocke et quel nom on donne
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Assure-toi que ce dossier existe !
  },
  filename: (req, file, cb) => {
    
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées !'));
  }
};

export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter
});