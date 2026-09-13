import jwt from 'jsonwebtoken';
import * as authService from '../services/auth.service.js';

const login = async (req, res) => {
  const { email, password } = req.body;

  const token = await authService.loginUser({ email, password });

  // ✅ TOKEN EN COOKIE HTTPONLY (sécurisé contre XSS)
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ success: true, message: 'Connexion réussie' });
};

// ✅ Renvoie toujours 200 : fini le 401 qui polluait la console
export const me = async (req, res) => {
  const decoded = authService.getSessionUser(req.cookies?.token);

  if (!decoded) return res.json({ authenticated: false });

  res.json({
    authenticated: true,
    user: { id: decoded.id, email: decoded.email, role: decoded.role },
  });
};

export default login;