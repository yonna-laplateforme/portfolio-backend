import express from 'express';
import login from '../controllers/auth.controller.js';
import validateAuth from '../validators/auth.validator.js';
import validate from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', validateAuth, validate, login);

// Route de déconnexion
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Déconnexion réussie' });
});

// vérifie si le cookie est valide
router.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

export default router;