import * as authService from '../services/auth.service.js';

const login = async (req, res) => {
  const { email, password } = req.body;

  const token = await authService.loginUser({ email, password });

  // ✅ ENVOIE LE TOKEN EN COOKIE HTTPONLY (sécurisé contre XSS)
  res.cookie('token', token, {
    httpOnly: true,      // JavaScript ne peut PAS lire ce cookie
    secure: true,        // Uniquement en HTTPS
    sameSite: 'strict',  // Protection CSRF
    domain: '.www.yonnamerlini.com',  
    maxAge: 24 * 60 * 60 * 1000, // 24 heures
  });

  // Renvoie juste un succès (pas le token en clair)
  res.json({ success: true, message: 'Connexion réussie' });
};

export default login;