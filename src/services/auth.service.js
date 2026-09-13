import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as UserModel from '../models/user.model.js';
import AppError from '../errors/AppError.js';
import 'dotenv/config'; 


export const loginUser = async ({ email, password }) => {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new AppError('Identifiants invalides', 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError('Identifiants invalides', 401);

    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};
// Retourne l'utilisateur de la session (ou null si token absent/invalide)
export const getSessionUser = (token) => {
  try {
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};