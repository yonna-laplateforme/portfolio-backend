import { Router } from "express";
// Import des validateurs de projet (à créer dans src/validators/project.validator.js)
import { validateProject } from "../validators/project.validator.js";
// Import des middlewares
import validate from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

// On importe les fonctions avec leurs nouveaux noms de "Project"
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

const router = Router();

/**
 * ROUTES PUBLIQUES
 */
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

/**
 * ROUTES PRIVÉES (ADMIN UNIQUEMENT)
 * On ajoute la couche de sécurité JWT ici
 */

// Créer un projet
router.post("/", 
  authenticate, 
  authorize('admin'), 
  validateProject, 
  validate, 
  createProject
);

// Modifier un projet
router.put("/:id", 
  authenticate, 
  authorize('admin'), 
  validateProject, 
  validate, 
  updateProject
);

// Supprimer un projet
router.delete("/:id", 
  authenticate, 
  authorize('admin'), 
  deleteProject
);

export default router;