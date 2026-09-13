import express from 'express';
import login, { me } from '../controllers/auth.controller.js';
import validateAuth from '../validators/auth.validator.js';
import validate from '../middlewares/validate.middleware.js';

const router = express.Router();

router.post('/login', validateAuth, validate, login);

// Route de déconnexion
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Déconnexion réussie' });
});

// ✅ Vérifie la session : renvoie toujours 200 (fin du 401 console)
router.get('/me', me);

export default router;