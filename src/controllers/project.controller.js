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
    const project = await ProjectService.createProject(req.body);
    res.status(201).json(project);
};

export const updateProject = async (req, res) => {
  const project = await ProjectService.updateProject(req.params.id, req.body);
  res.json(project);
};

export const deleteProject = async (req, res) => {
  await ProjectService.deleteProject(req.params.id);
  res.status(204).send(); 
};