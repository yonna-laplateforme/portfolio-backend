import express from 'express';
import  login  from '../controllers/auth.controller.js';
import  validateAuth from '../validators/auth.validator.js';
import validate from '../middlewares/validate.middleware.js';

const router = express.Router();


router.post('/login', validateAuth, validate, login);

export default router;