import { Router } from 'express';
import * as homeController from '../controllers/home.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { uploadImage, uploadVideo } from '../middlewares/upload.middleware.js';

const router = Router();

router.get('/', homeController.getHomeContent);

router.put('/',
  authenticate,
  authorize('admin'),
  homeController.updateHomeContent
);

router.post('/video',
  authenticate,
  authorize('admin'),
  uploadVideo.single('video'),
  homeController.uploadHomeVideo
);

router.post('/poster',
  authenticate,
  authorize('admin'),
  uploadImage.single('image'),
  homeController.uploadHomePoster
);

export default router;