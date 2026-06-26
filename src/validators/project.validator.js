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
    .isURL({ require_protocol: false }).withMessage('Le lien GitHub doit être une URL valide'),

  body('demo_url')
    .optional({ checkFalsy: true })
    .isURL({ require_protocol: false }).withMessage('Le lien de la démo doit être une URL valide'),
  
  body('client').optional().isString(),
  body('role').optional().isString(),
  body('date_realisation').optional().isString(),
  body('visibility').optional().isIn(['Publié', 'Brouillon', 'Privé']).withMessage('Statut de visibilité invalide'),
  
  // MISE À JOUR : Validation de category_id au lieu de category
  body('category_id')
    .notEmpty()
    .withMessage('La catégorie est obligatoire')
    .isInt()
    .withMessage('La catégorie doit être un identifiant numérique'),
  
  // Validation spécifique pour isFeatured
  body('isFeatured')
    .optional()
    .customSanitizer(value => {
        return (value == 1 || value === 'true' || value === true) ? 1 : 0;
    })
    .isInt({ min: 0, max: 1 })
    .withMessage('isFeatured doit être 0 ou 1')
];