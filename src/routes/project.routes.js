import express from 'express';
import { 
  getAllProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/project.controller.js';

import { authenticate, authorize } from '../middlewares/auth.middleware.js'; 
import { projectValidationRules, projectValidationId } from '../validators/project.validator.js';
import validate from '../middlewares/validate.middleware.js';
import  upload  from '../utils/cloudinary.js'; 

const router = express.Router();

// --- ROUTES PUBLIQUES ---

router.get('/', getAllProjects);

// Ajout du middleware validate pour l'ID
router.get('/:id', projectValidationId, validate, getProjectById);

// --- ROUTES ADMIN ---

// Créer un projet (POST)
router.post('/', 
  authenticate, 
  authorize('admin'), 
  upload.single('image'), 
  projectValidationRules, 
  validate, 
  createProject
);

// Modifier un projet (PUT)
router.put('/:id', 
  authenticate, 
  authorize('admin'), 
  upload.single('image'), 
  projectValidationId,    // Valide d'abord l'ID (9)
  projectValidationRules, // Puis valide les champs envoyés
  validate, 
  updateProject
);

// Supprimer un projet (DELETE)
router.delete('/:id', 
  authenticate, 
  authorize('admin'), 
  projectValidationId, 
  validate,
  deleteProject
);

export default router;