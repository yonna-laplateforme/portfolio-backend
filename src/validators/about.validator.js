import { body } from 'express-validator';

const aboutValidator = {
  rules: [
    body('header_line1').trim().notEmpty().withMessage('La ligne 1 du header est requise'),
    body('header_line2').trim().notEmpty().withMessage('La ligne 2 du header est requise'),
    body('header_accent').trim().notEmpty().withMessage("L'accent est requis"),
    body('header_subtitle').trim().optional(),
    body('bio_text').trim().notEmpty().withMessage('La biographie est requise'),
    body('philosophy_prefix').trim().optional(),
    body('philosophy_important').trim().optional(),
    body('philosophy_suffix').trim().optional(),
    body('philosophy_text').trim().notEmpty().withMessage('Le texte de philosophie est requis'),
    body('philosophy_author').trim().optional(),
    body('dualite_title').trim().optional(),
    body('dualite_text').trim().optional(),
    body('tech_dev').trim().optional(),
    body('tech_photo').trim().optional()
  ]
};

export default aboutValidator;