import { body } from 'express-validator';

export const validateContact = [
    body('name')
        .notEmpty().withMessage('Le nom est obligatoire')
        .isString().withMessage('Le nom doit être une chaîne de caractères')
        .isLength({ min: 2, max: 100 }).withMessage('Le nom doit faire entre 2 et 100 caractères'),

    body('email')
        .notEmpty().withMessage("L'email est obligatoire")
        .isEmail().withMessage("Format d'email invalide"),

    body('message')
        .notEmpty().withMessage('Le message est obligatoire')
        .isString().withMessage('Le message doit être une chaîne de caractères')
        .isLength({ min: 10, max: 2000 }).withMessage('Le message doit faire entre 10 et 2000 caractères')
];