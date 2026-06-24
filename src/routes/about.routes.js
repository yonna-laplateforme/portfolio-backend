import { Router } from 'express';
import * as aboutController from '../controllers/about.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import uploadAbout from '../utils/cloudinaryAbout.js';

const router = Router();

router.get('/', aboutController.getAboutContent);

// Utilisation de uploadAbout pour la mise à jour globale
router.put('/', 
  authenticate, 
  authorize('admin'), 
  uploadAbout.single('image'), 
  aboutController.updateAboutContent
);

// Utilisation de uploadAbout pour l'upload spécifique de la photo
router.post('/photo', 
  authenticate, 
  authorize('admin'), 
  uploadAbout.single('image'), 
  aboutController.uploadAboutPhoto
);

export default router;