import express from 'express';
import multer from 'multer';
// CET IMPORT EST LA CLÉ : il importe tout le contrôleur sous le nom 'projectController'
import * as projectController from '../controllers/project.controller.js'; 
import upload from '../utils/cloudinary.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { projectValidationRules, projectValidationId } from '../validators/project.validator.js';
import validate from '../middlewares/validate.middleware.js';

const router = express.Router();

// --- GESTIONNAIRE D'ERREURS D'UPLOAD ---
const handleUpload = (req, res, next) => {
  const uploadMultiple = upload.array('images', 10);
  uploadMultiple(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

// --- ROUTES ---
router.get('/home', projectController.getProjectsForHome);
router.get('/:id', projectController.getProjectById);
router.get('/', projectController.getAllProjects);

router.post('/', 
  authenticate, authorize('admin'), handleUpload, projectValidationRules, validate, 
  projectController.createProject
);

router.put('/:id', 
  authenticate, authorize('admin'), handleUpload, projectValidationId, projectValidationRules, validate, 
  projectController.updateProject
);

router.delete('/:id', 
  authenticate, authorize('admin'), projectValidationId, validate, 
  projectController.deleteProject
);

export default router;