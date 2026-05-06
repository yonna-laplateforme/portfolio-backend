import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // On utilise next(AppError) pour que le errorHandler attrape le 401
    return next(new AppError("Token manquant ou format invalide", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // On stocke { id, email, role } dans req.user
    next();
  } catch (err) {
    next(new AppError("Token invalide ou expiré", 401));
  }
};

export const authorize = (role) => {
  return (req, res, next) => {
    // req.user a été rempli juste avant par le middleware authenticate
    if (req.user.role !== role) {
      return next(new AppError("Accès refusé : privilèges insuffisants", 403));
    }
    next();
  };
};