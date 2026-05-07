import express from 'express';
import { sendContactMessage } from '../controllers/contact.controller.js';
import { contactValidationRules } from '../validators/contact.validator.js';
import validate from '../middlewares/validate.middleware.js';

const router = express.Router();


router.post('/', contactValidationRules, validate, sendContactMessage);

export default router;