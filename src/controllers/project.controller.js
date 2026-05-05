import * as projectService from "../services/project.service.js";

/**
 * RÉCUPÉRER TOUS LES PROJETS
 * GET /api/projects
 */
export const getAllProjects = async (req, res) => {
  const projects = await projectService.getAllProjects();
  res.json(projects);
};

/**
 * RÉCUPÉRER UN PROJET PAR SON ID
 * GET /api/projects/:id
 */
export const getProjectById = async (req, res) => {
  const project = await projectService.getProjectById(req.params.id);
  res.json(project);
};

/**
 * CRÉER 
 * POST /api/projects
 */
export const createProject = async (req, res) => {
  // En phase 1, on prend simplement le body
  // Les validations sont gérées par le middleware express-validator en amont
  const newProject = await projectService.createProject(req.body);
  res.status(201).json(newProject);
};

/**
 * MODIFIER 
 * PUT /api/projects/:id
 */
export const updateProject = async (req, res) => {
  const updatedProject = await projectService.updateProject(req.params.id, req.body);
  res.json({
    message: "Projet mis à jour avec succès",
    data: updatedProject
  });
};

/**
 * SUPPRIMER
 * DELETE /api/projects/:id
 */
export const deleteProject = async (req, res) => {
  await projectService.deleteProject(req.params.id);
  // 204 No Content est le statut standard après une suppression réussie
  res.status(204).send();
};