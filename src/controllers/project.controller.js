import * as ProjectService from '../services/project.service.js';

export const getAllProjects = async (req, res) => {
    const projects = await ProjectService.getAllProjects();
    res.json(projects);
};

export const getProjectById = async (req, res) => {
    const { id } = req.params;
    const project = await ProjectService.getProjectById(id);
    res.json(project);
};

export const createProject = async (req, res) => {
    const projectData = { ...req.body };

    // Changement ici : on prend le 'path' fourni par Cloudinary
    if (req.file) {
        projectData.image_url = req.file.path; 
    }

    const project = await ProjectService.createProject(projectData);
    res.status(201).json(project);
};

export const updateProject = async (req, res) => {
    const { id } = req.params;
    const projectData = { ...req.body };

    // Changement ici : on prend le 'path' fourni par Cloudinary
    if (req.file) {
        projectData.image_url = req.file.path; 
    }

    const project = await ProjectService.updateProject(id, projectData);
    res.json(project);
};

export const deleteProject = async (req, res) => {
    await ProjectService.deleteProject(req.params.id);
    res.status(204).send(); 
};