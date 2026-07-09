import * as ProjectService from '../services/project.service.js';

/**
 * Récupérer tous les projets
 */
export const getAllProjects = async (req, res, next) => {
    try {
        const projects = await ProjectService.getAllProjects();
        return res.json(projects);
    } catch (error) {
        return next(error);
    }
};

/**
 * Récupérer les projets affichés sur la home
 */
export const getProjectsForHome = async (req, res, next) => {
    try {
        const projects = await ProjectService.getProjectsForHome();
        return res.json(projects);
    } catch (error) {
        return next(error);
    }
};

/**
 * Récupérer un projet par son ID
 */
export const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await ProjectService.getProjectById(id);

        if (!project) {
            return res.status(404).json({ error: 'Projet introuvable' });
        }

        return res.json(project);
    } catch (error) {
        return next(error);
    }
};

/**
 * Créer un nouveau projet
 */
export const createProject = async (req, res, next) => {
    try {
        const projectData = { ...req.body };

        projectData.isFeatured =
            req.body.isFeatured === 'true' ||
                req.body.isFeatured === 1 ||
                req.body.isFeatured === '1'
                ? 1
                : 0;

        if (req.files && req.files.length > 0) {
            projectData.image_urls = req.files.map((file) => file.path);
        } else {
            projectData.image_urls = [];
        }

        const project = await ProjectService.createProject(projectData);

        return res.status(201).json(project);
    } catch (error) {
        return next(error);
    }
};

/**
 * Modifier un projet existant
 */
export const updateProject = async (req, res, next) => {
    try {
        const { id } = req.params;

        const currentProject = await ProjectService.getProjectById(id);

        if (!currentProject) {
            return res.status(404).json({ error: 'Projet introuvable' });
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

        if (req.files && req.files.length > 0) {
            const newFilePaths = req.files.map((file) => file.path);
            projectData.image_urls = [...existingImages, ...newFilePaths];
        } else {
            projectData.image_urls = existingImages;
        }

        const project = await ProjectService.updateProject(id, projectData);

        return res.json(project);
    } catch (error) {
        return next(error);
    }
};

/**
 * Supprimer un projet
 */
export const deleteProject = async (req, res, next) => {
    try {
        await ProjectService.deleteProject(req.params.id);
        return res.status(204).send();
    } catch (error) {
        return next(error);
    }
};