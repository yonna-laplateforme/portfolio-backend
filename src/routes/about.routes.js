import express from 'express';
import aboutController from '../controllers/about.controller.js';
import aboutValidator from '../validators/about.validator.js';
import validate from '../middlewares/validate.middleware.js';
import upload from '../middlewares/upload.middleware.js';

// Imports avec accolades pour les exports nommés
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/authorize.middleware.js';

const router = express.Router();

router.get('/', aboutController.getAboutContent);

router.put('/', 
  authenticate, 
  authorize('admin'), 
  ...aboutValidator.rules, // Utilisation du spread operator pour les règles
  validate, 
  aboutController.updateAboutContent
);

router.post('/photo', 
  authenticate, 
  authorize('admin'), 
  upload.single('photo'), 
  aboutController.uploadAboutPhoto
);

export default router;