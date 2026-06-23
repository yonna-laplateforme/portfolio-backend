import AppError from '../errors/AppError.js';

export const authorize = (...roles) => (req, res, next) => {
  // On vérifie si l'utilisateur existe ET si son rôle est dans la liste autorisée
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new AppError('Accès interdit', 403));
  }
  next();
};

