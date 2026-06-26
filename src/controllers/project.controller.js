import * as ProjectService from '../services/project.service.js';

/**
 * R (Read) - Récupérer TOUS les projets
 * (La requête SQL avec JOIN sera dans le Service)
 */
export const getAllProjects = async (req, res) => {
    const projects = await ProjectService.getAllProjects();
    res.json(projects);
};
export const getProjectsForHome = async (req, res) => {
    try {
        const projects = await ProjectService.getProjectsForHome();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des projets pour la home" });
    }
};
/**
 * R (Read) - Récupérer UN projet par son ID
 */
export const getProjectById = async (req, res) => {
    const { id } = req.params;
    const project = await ProjectService.getProjectById(id);
    
    if (!project) {
        return res.status(404).json({ error: "Projet introuvable" });
    }
    
    res.json(project);
};

/**
 * C (Create) - Créer un nouveau projet
 * NOUVEAU : Gère category_id et un tableau de photos
 */
export const createProject = async (req, res) => {
    const projectData = { ...req.body };

    // Vérification et formatage de isFeatured
    projectData.isFeatured = (req.body.isFeatured === 'true' || req.body.isFeatured === 1 || req.body.isFeatured === '1') ? 1 : 0;

    // GESTION MULTI-IMAGES (req.files au lieu de req.file)
    // On extrait toutes les URLs sécurisées de Cloudinary dans un tableau
    if (req.files && req.files.length > 0) {
        projectData.image_urls = req.files.map(file => file.path); 
    } else {
        projectData.image_urls = [];
    }

    const project = await ProjectService.createProject(projectData);
    res.status(201).json(project);
};

/**
 * U (Update) - Modifier un projet existant
 */
export const updateProject = async (req, res) => {
    const { id } = req.params;
    
    // 1. Récupérer le projet actuel pour avoir ses anciennes photos
    const currentProject = await ProjectService.getProjectById(id);
    if (!currentProject) return res.status(404).json({ error: "Projet introuvable" });

    const projectData = { ...req.body };
    projectData.isFeatured = (req.body.isFeatured === 'true' || req.body.isFeatured === 1 || req.body.isFeatured === '1') ? 1 : 0;

    // 2. Gérer la fusion des photos
    // On transforme la chaîne "url1,url2" (BDD) en tableau
    let existingImages = currentProject.image_url ? currentProject.image_url.split(',') : [];

    // Si on ajoute de nouvelles images pendant la modification
    if (req.files && req.files.length > 0) {
        const newFilePaths = req.files.map(file => file.path);
        // On fusionne les anciennes + les nouvelles
        projectData.image_urls = [...existingImages, ...newFilePaths];
    } else {
        // Sinon, on garde juste les anciennes
        projectData.image_urls = existingImages;
    }

    const project = await ProjectService.updateProject(id, projectData);
    res.json(project);
};

/**
 * D (Delete) - Supprimer un projet
 */
export const deleteProject = async (req, res) => {
    await ProjectService.deleteProject(req.params.id);
    res.status(204).send(); 
};