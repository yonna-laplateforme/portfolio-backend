import * as technologyModel from '../models/technology.model.js';

export const getAllTechnologies = async (req, res, next) => {
    try {
        const technologies = await technologyModel.findAll();
        
        // On renvoie la liste au format JSON pour le front-end React
        res.status(200).json(technologies);
    } catch (error) {
      
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const { name } = req.body;
        // Appel de la méthode de ton modèle pour insérer en BDD
        const newTech = await technologyModel.create(name);
        
        // Retourne la nouvelle techno créée avec son ID
        res.status(201).json(newTech);
    } catch (error) {
        next(error);
    }
};