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

// 🔧 Logique métier interne : fusionne les médias conservés + les nouveaux fichiers
const buildImageUrls = (data, currentProject, newFilePaths) => {
  const currentList = currentProject?.image_url
    ? currentProject.image_url.split(',').map((u) => u.trim()).filter(Boolean)
    : [];

  let kept = currentList;
  if (data.existingImages) {
    try {
      const parsed = JSON.parse(data.existingImages);
      if (Array.isArray(parsed)) {
        kept = parsed.map((u) => u.trim()).filter(Boolean); // liste « conservée » envoyée par le front
      }
    } catch {
      kept = currentList; // JSON invalide → on ne perd rien
    }
  }

  return [...kept, ...newFilePaths];
};

// 🔧 Sanitisation du flag isFeatured (string '1'/'true' → 1, sinon 0)
const sanitizeIsFeatured = (value) =>
  value === 'true' || value === 1 || value === '1' ? 1 : 0;

/**
 * CRÉER UN PROJET
 */
export const createProject = async (data, newFilePaths = []) => {
  const projectData = { ...data };
  projectData.isFeatured = sanitizeIsFeatured(data.isFeatured);
  projectData.image_urls = newFilePaths;
  return projectModel.create(projectData);
};

/**
 * MODIFIER UN PROJET
 */
export const updateProject = async (id, data, newFilePaths = []) => {
  const currentProject = await projectModel.findById(id);
  if (!currentProject) {
    throw new AppError("Projet introuvable, mise à jour impossible", 404);
  }

  const projectData = { ...data };
  projectData.isFeatured = sanitizeIsFeatured(data.isFeatured);
  projectData.image_urls = buildImageUrls(projectData, currentProject, newFilePaths);
  delete projectData.existingImages; // champ technique, on ne le stocke pas

  const isUpdated = await projectModel.update(id, projectData);
  if (!isUpdated) {
    throw new AppError("Projet introuvable, mise à jour impossible", 404);
  }

  return await projectModel.findById(id);
};

/**
 * RÉCUPÉRER LES PROJETS POUR LA HOME
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