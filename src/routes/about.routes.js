import { Router } from 'express';
import * as aboutController from '../controllers/about.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { uploadImage, uploadVideo } from '../middlewares/upload.middleware.js';

const router = Router();

router.get('/', aboutController.getAboutContent);

// Mise à jour globale 
router.put('/', 
  authenticate, 
  authorize('admin'), 
  aboutController.updateAboutContent
);

// Upload spécifique de la photo
router.post('/photo', 
  authenticate, 
  authorize('admin'), 
  uploadImage.single('image'), 
  aboutController.uploadAboutPhoto
);

// Upload spécifique de la vidéo
router.post('/video', 
  authenticate, 
  authorize('admin'), 
  uploadVideo.single('video'), 
  aboutController.uploadAboutVideo
);

export default router;