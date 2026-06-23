import { body} from 'express-validator';

const contactValidationRules = [
  body('name')
    .notEmpty()
    .withMessage('Le nom est obligatoire')
    .trim()
    .escape(),
  
  body('email')
    .isEmail()
    .withMessage('Format d\'email invalide')
    .normalizeEmail(),
  
  body('message')
    .isLength({ min: 10 })
    .withMessage('Le message doit faire au moins 10 caractères')
    .trim()
    .escape()
];
export default contactValidationRules;
