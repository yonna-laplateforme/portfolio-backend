import * as ContactService from '../services/contact.service.js';
import { sendSuccess } from '../utils/responseHandler.js';

export const sendContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    await ContactService.sendContactEmail({ name, email, message });

   
    sendSuccess(res, "Votre message a été envoyé avec succès !");
  } catch (error) {
    next(error);
  }
};