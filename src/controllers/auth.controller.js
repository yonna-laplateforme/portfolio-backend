import * as authService from '../services/auth.service.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Si le service throw une AppError, elle sera captée par le errorHandler global
  const token = await authService.loginUser({ email, password });

  res.json({ token });
};