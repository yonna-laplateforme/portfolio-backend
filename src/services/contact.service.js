import nodemailer from 'nodemailer';
import AppError from '../errors/AppError.js';

export const sendContactEmail = async ({ name, email, message }) => {
  // 1. Création du transporteur
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true pour le port 465, false pour le 587
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // 2. Configuration du contenu de l'email
  const mailOptions = {
    from: `"${name}" <${process.env.MAIL_USER}>`, // Gmail force souvent l'expéditeur authentifié
    replyTo: email, // Permet de répondre directement au visiteur
    to: process.env.MAIL_TO,
    subject: `Nouveau message Portfolio de ${name}`,
    text: `Vous avez reçu un message de : ${name} (${email})\n\nMessage :\n${message}`,
    html: `
      <h3>Nouveau message depuis votre Portfolio</h3>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Message :</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    // 3. Envoi effectif
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Erreur Nodemailer:', error);
    throw new AppError("L'envoi de l'email a échoué. Veuillez réessayer plus tard.", 500);
  }
};