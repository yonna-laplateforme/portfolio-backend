import * as ProjectService from '../services/project.service.js';
import AppError from '../errors/AppError.js';

/**
 * Récupérer tous les projets
 */
export const getAllProjects = async (req, res) => {
  const projects = await ProjectService.getAllProjects();
  return res.json(projects);
};

/**
 * Récupérer les projets de la page d'accueil
 */
export const getProjectsForHome = async (req, res) => {
  const projects = await ProjectService.getProjectsForHome();
  return res.json(projects);
};

/**
 * Récupérer un projet par son ID
 */
export const getProjectById = async (req, res) => {
  const project = await ProjectService.getProjectById(req.params.id);
  return res.json(project);
};

/**
 * Créer un nouveau projet
 */
export const createProject = async (req, res) => {
  const newFilePaths = req.files?.map((file) => file.path) ?? [];
  const project = await ProjectService.createProject(req.body, newFilePaths);
  return res.status(201).json(project);
};

/**
 * Modifier un projet existant
 */
export const updateProject = async (req, res) => {
  const newFilePaths = req.files?.map((file) => file.path) ?? [];
  const project = await ProjectService.updateProject(req.params.id, req.body, newFilePaths);
  return res.json(project);   // ← pareil, le service throw la 404 si besoin
};


/**
 * Supprimer un projet
 */
export const deleteProject = async (req, res) => {
  await ProjectService.deleteProject(req.params.id);
  return res.status(204).send();
};