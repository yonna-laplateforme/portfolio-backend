import { body } from 'express-validator';

export const validateAuth = [
  body('email').notEmpty().withMessage('Email obligatoire').isEmail().withMessage('Format email invalide'),
  body('password').notEmpty().withMessage('Mot de passe requis')
];