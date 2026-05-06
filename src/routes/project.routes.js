import express from 'express';
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject} from '../controllers/project.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js'; 
import { projectValidationRules } from '../validators/project.validator.js';
import validate from '../middlewares/validate.middleware.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);


router.post('/', authenticate, authorize('admin'), projectValidationRules, validate, createProject);
router.put('/:id', authenticate, authorize('admin'), projectValidationRules, validate, updateProject);
router.delete('/:id', authenticate, authorize('admin'), deleteProject);

export default router;