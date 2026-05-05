import * as projectModel from "../models/project.model.js";
import AppError from "../errors/AppError.js";

/**
 * RÉCUPÉRER TOUS LES PROJETS
 */
export const getAllProjects = async () => {
  // On appelle le model qui fait le SELECT *
  return await projectModel.findAll();
};

/**
 * RÉCUPÉRER UN PROJET PAR SON ID
 */
export const getProjectById = async (id) => {
  const project = await projectModel.findById(id);

  // Si le projet n'existe pas (null ou undefined), on lance l'erreur
  if (!project) {
    throw new AppError("Projet introuvable", 404);
  }

  return project;
};

/**
 * CRÉER UN PROJET
 */
export const createProject = async (projectData) => {
  // On envoie les données au model. 
  // C'est le model qui s'occupe du INSERT INTO
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

  // On retourne le projet mis à jour pour que le front puisse l'afficher
  return await projectModel.findById(id);
};

/**
 * SUPPRIMER 
 */
export const deleteProject = async (id) => {
  const isDeleted = await projectModel.remove(id);

  if (!isDeleted) {
    throw new AppError("Projet introuvable, suppression impossible", 404);
  }

  return true;
};