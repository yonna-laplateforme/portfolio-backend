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