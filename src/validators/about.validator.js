import { body } from 'express-validator';

const aboutValidator = {
  rules: [
    body('header_title').trim().notEmpty().withMessage('Le titre est requis'),
    body('header_subtitle').trim().optional(),
    body('bio_text').trim().notEmpty().withMessage('La biographie est requise'),
    body('philosophy_quote').trim().optional(),
    body('philosophy_author').trim().optional(),
    // On s'assure que expertises est bien un tableau
    body('expertises').optional().isArray().withMessage('Les expertises doivent être une liste')
  ]
};

export default aboutValidator;