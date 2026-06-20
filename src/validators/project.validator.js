// dans ../validators/project.validator.js
import { body, param } from 'express-validator';

export const projectValidationId = [
  param('id').isInt().withMessage('L\'ID doit être un nombre entier')
];

export const projectValidationRules = [
  body('title').notEmpty().withMessage('Le titre est obligatoire'),
  body('description').optional().isString(),
  body('tech_stack').optional().isString(),
  body('github_url')
  .optional({ checkFalsy: true }) 
  .isURL().withMessage('Le lien GitHub doit être une URL valide'),

body('demo_url')
  .optional({ checkFalsy: true })
  .isURL().withMessage('Le lien de la démo doit être une URL valide'),
  
  // NOUVEAUX CHAMPS
  body('client').optional().isString(),
  body('role').optional().isString(),
  body('date_realisation').optional().isString(),
  body('visibility').optional().isIn(['Publié', 'Brouillon', 'Privé']).withMessage('Statut de visibilité invalide'),
  
  // Validation spécifique pour isFeatured venant d'un FormData
 // Validation spécifique pour isFeatured
  body('isFeatured')
    .optional()
    .customSanitizer(value => {
        // Si la valeur est 1, '1', true ou 'true', on renvoie 1. Sinon 0.
        return (value == 1 || value === 'true' || value === true) ? 1 : 0;
    })
    .isInt({ min: 0, max: 1 }) // Vérifie que c'est bien 0 ou 1
    .withMessage('isFeatured doit être 0 ou 1')
];