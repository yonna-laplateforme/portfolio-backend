import * as projectModel from "../models/project.model.js";
import AppError from "../errors/AppError.js";

/**
 * RÉCUPÉRER TOUS LES PROJETS
 */
export const getAllProjects = async () => {
 
  return await projectModel.findAll();
};

/**
 * RÉCUPÉRER UN PROJET PAR SON ID
 */
export const getProjectById = async (id) => {
  const project = await projectModel.findById(id);

 
  if (!project) {
    throw new AppError("Projet introuvable", 404);
  }

  return project;
};

/**
 * CRÉER UN PROJET
 */
export const createProject = async (projectData) => {
  
  return await projectModel.create(projectData);
};

/**
 * MODIFIER UN PROJET
 */
export const updateProject = async (id, projectData) => {
  const isUpdated = await projectModel.update(id, projectData);

  
  if (!isUpdated) {
    throw new AppError("Projet introuvable, mise à jour impossible", 404);
  }

 
  return await projectModel.findById(id);
};
/**
 * RÉCUPÉRER LES PROJETS POUR LA HOME (AVEC UNE SEULE IMAGE)
 */
export const getProjectsForHome = async () => {
  return await projectModel.findForHome();
};
/**
 * SUPPRIMER UN PROJET
 */
export const deleteProject = async (id) => {
  const isDeleted = await projectModel.remove(id);

  if (!isDeleted) {
    throw new AppError("Projet introuvable, suppression impossible", 404);
  }

  return true;
  
};