import * as authService from '../services/auth.service.js';

const login = async (req, res) => {
  const { email, password } = req.body;

  const token = await authService.loginUser({ email, password });

  // ✅ ENVOIE LE TOKEN EN COOKIE HTTPONLY (sécurisé contre XSS)
 res.cookie('token', token, {
  httpOnly: true,
  secure: true,        // HTTPS obligatoire pour SameSite=None
  sameSite: 'none',    // ← LA correction : autorise l'envoi cross-site
  maxAge: 24 * 60 * 60 * 1000
});
app.set('trust proxy', 1);

  // Renvoie juste un succès (pas le token en clair)
  res.json({ success: true, message: 'Connexion réussie' });
};

export default login;