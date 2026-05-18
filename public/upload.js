import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // On enregistre physiquement dans public/uploads
    cb(null, 'public/uploads/'); 
  },
  filename: (req, file, cb) => {
    // On garde un nom unique
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });