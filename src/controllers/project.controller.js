// On importe le service qui va interagir avec la base de données pour les projets.
import * as ProjectService from '../services/project.service.js';

/**
 * R (Read) - Récupérer TOUS les projets
 * Rôle : Lister l'ensemble des projets de la base de données.
 */
export const getAllProjects = async (req, res) => {
    // On attend que le service récupère la liste complète des projets
    const projects = await ProjectService.getAllProjects();
    // On renvoie la liste au client au format JSON (statut 200 par défaut)
    res.json(projects);
};

/**
 * R (Read) - Récupérer UN projet par son ID
 * Rôle : Afficher les détails d'un projet spécifique (ex: pour une page détail).
 */
export const getProjectById = async (req, res) => {
    // On extrait l'ID des paramètres de l'URL (ex: /api/projects/5 -> id vaut 5)
    const { id } = req.params;
    // On demande au service d'aller chercher ce projet précis
    const project = await ProjectService.getProjectById(id);
    // On renvoie le projet trouvé en JSON
    res.json(project);
};

/**
 * C (Create) - Créer un nouveau projet
 * Rôle : Recevoir les données d'un formulaire et enregistrer un projet, avec ou sans image.
 */
export const createProject = async (req, res) => {
    // On crée une copie locale des données textuelles reçues du formulaire (title, description, etc.)
    // grâce à l'opérateur de décomposition / spread operator (...)
    const projectData = { ...req.body };

    // Si un fichier (image) a été transmis dans la requête (via un middleware comme Multer) :
    if (req.file) {
        // Le middleware Cloudinary a déjà uploadé l'image et a placé son URL sécurisée dans req.file.path.
        // On l'ajoute à nos données sous la clé 'image_url' pour l'enregistrer en BDD.
        projectData.image_url = req.file.path; 
    }

    // On demande au service de créer le projet avec toutes ces données
    const project = await ProjectService.createProject(projectData);
    // On renvoie le projet créé avec un code HTTP 201 (Created), ce qui respecte les conventions REST
    res.status(201).json(project);
};

/**
 * U (Update) - Modifier un projet existant
 * Rôle : Mettre à jour les infos d'un projet (texte et/ou nouvelle image).
 */
export const updateProject = async (req, res) => {
    console.log("--- REQUÊTE REÇUE ---");
    console.log("BODY :", req.body);
    console.log("FILE :", req.file);
    const { id } = req.params;
    const projectData = { ...req.body };

    // 1. FORÇAGE DE LA VALEUR : 
    // On s'assure que isFeatured est bien un nombre (1 ou 0)
    // On vérifie si req.body.isFeatured existe, sinon on le met à 0 par défaut
    if (req.body.isFeatured !== undefined) {
        projectData.isFeatured = (req.body.isFeatured === 'true' || req.body.isFeatured === 1 || req.body.isFeatured === '1') ? 1 : 0;
    } else {
        projectData.isFeatured = 0; // Valeur par défaut
    }

    if (req.body.category) {
        projectData.category = req.body.category.toUpperCase();
    }

    if (req.file) {
        projectData.image_url = req.file.path; 
    }

    const project = await ProjectService.updateProject(id, projectData);
    res.json(project);
};
/**
 * D (Delete) - Supprimer un projet
 * Rôle : Retirer définitivement un projet de la base de données.
 */
export const deleteProject = async (req, res) => {
    // On demande au service de supprimer le projet correspondant à l'ID de l'URL
    await ProjectService.deleteProject(req.params.id);
    // On renvoie un statut HTTP 204 (No Content). 
    // C'est la norme REST : l'opération a réussi, mais il n'y a plus rien à renvoyer (le projet est détruit).
    res.status(204).send(); 
};