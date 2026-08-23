import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';

export const authenticate = (req, res, next) => {
  // LIT LE TOKEN DEPUIS LE COOKIE 
  const token = req.cookies.token;

  if (!token) {
    return next(new AppError("Token manquant", 401));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(new AppError("Token invalide ou expiré", 401));
  }
};

export const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return next(new AppError("Accès refusé : privilèges insuffisants", 403));
    }
    next();
  };
};