import { body ,param} from 'express-validator';



export const projectValidationRules = [
    body('title')
        .notEmpty().withMessage('Le titre est obligatoire')
        .isString().withMessage('Le titre doit être une chaîne de caractères')
        .isLength({ min: 2, max: 150 }).withMessage('Le titre doit faire entre 2 et 150 caractères'),

    body('description')
        .optional()
        .isString().withMessage('La description doit être une chaîne')
        .isLength({ max: 2000 }).withMessage('La description ne peut pas dépasser 2000 caractères'),

    body('tech_stack')
        .optional()
        .isString().withMessage('La tech_stack doit être une chaîne')
        .isLength({ max: 255 }).withMessage('La tech_stack ne peut pas dépasser 255 caractères'),

    body('github_url')
        .optional({ checkFalsy: true }) // Permet de passer une chaîne vide
        .isURL().withMessage('Le lien GitHub doit être une URL valide'),

    body('demo_url')
        .optional({ checkFalsy: true })
        .isURL().withMessage('Le lien de démo doit être une URL valide'),

    body('image_url')
        .optional({ checkFalsy: true })
        .isURL().withMessage("L'URL de l'image doit être valide")
];

export const projectValidationId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage("l'id doit être un entier positif")
];