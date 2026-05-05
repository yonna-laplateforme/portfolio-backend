
import * as authService from "../services/auth.service.js"

export const create = async (req, res, next) => {
 await authService.create({ ...req.body });
  res.status(201).json({ message:"compte créé"});
};

export const login = async (req, res) => {
    const token = await authService.login( req.body );
    res.json(token)
}