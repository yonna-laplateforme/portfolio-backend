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
 * Récupérer les projets affichés sur la page d'accueil
 */
export const getProjectsForHome = async (req, res) => {
  const projects = await ProjectService.getProjectsForHome();
  return res.json(projects);
};

/**
 * Récupérer un projet par son ID
 */
export const getProjectById = async (req, res) => {
  const { id } = req.params;
  const project = await ProjectService.getProjectById(id);

  if (!project) {
    throw new AppError('Projet introuvable', 404);
  }

  return res.json(project);
};

/**
 * Créer un nouveau projet
 */
export const createProject = async (req, res) => {
  const projectData = { ...req.body };

  projectData.isFeatured =
    req.body.isFeatured === 'true' ||
    req.body.isFeatured === 1 ||
    req.body.isFeatured === '1'
      ? 1
      : 0;

  projectData.image_urls =
    req.files?.length > 0
      ? req.files.map((file) => file.path)
      : [];

  const project = await ProjectService.createProject(projectData);

  return res.status(201).json(project);
};

/**
 * Modifier un projet existant
 */
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const currentProject = await ProjectService.getProjectById(id);

  if (!currentProject) {
    throw new AppError('Projet introuvable', 404);
  }

  const projectData = { ...req.body };

  projectData.isFeatured =
    req.body.isFeatured === 'true' ||
    req.body.isFeatured === 1 ||
    req.body.isFeatured === '1'
      ? 1
      : 0;

  const existingImages = currentProject.image_url
    ? currentProject.image_url.split(',')
    : [];

  const newFilePaths =
    req.files?.length > 0
      ? req.files.map((file) => file.path)
      : [];

  projectData.image_urls = [...existingImages, ...newFilePaths];

  const project = await ProjectService.updateProject(id, projectData);

  return res.json(project);
};

/**
 * Supprimer un projet
 */
export const deleteProject = async (req, res) => {
  await ProjectService.deleteProject(req.params.id);
  return res.status(204).send();
};