import { body } from 'express-validator';

const homeValidator = {
  rules: [
    body('label').trim().optional(),
    body('title_line1').trim().notEmpty().withMessage('Le titre (ligne 1) est requis'),
    body('title_line2').trim().notEmpty().withMessage('Le titre (ligne 2) est requis'),
    body('paragraph').trim().notEmpty().withMessage('Le paragraphe est requis'),
    body('cta1_label').trim().optional(),
    body('cta1_url').trim().optional(),
    body('cta2_label').trim().optional(),
    body('cta2_url').trim().optional()
  ]
};

export default homeValidator;