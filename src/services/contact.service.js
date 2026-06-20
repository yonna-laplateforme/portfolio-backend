import nodemailer from 'nodemailer';
import AppError from '../errors/AppError.js';

export const sendContactEmail = async ({ name, email, message }) => {
  
  // 💡 DÉPLACEMENT ICI : Le transporteur est créé à la demande, les variables .env sont lues à coup sûr !
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.MAIL_USER, // yonna.s.merlini@gmail.com
      pass: process.env.MAIL_PASS, // pekyuirstnlkdrhr
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.MAIL_USER}>`, 
    replyTo: email, 
    to: process.env.MAIL_TO,
    subject: `Nouveau message Portfolio de ${name}`,
    text: `Vous avez reçu un message de : ${name} (${email})\n\nMessage :\n${message}`,
    html: `
      <h3>Nouveau message depuis votre Portfolio</h3>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Message :</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✉️ Email envoyé avec succès par le Service !');
    return true;
  } catch (error) {
    console.error('Erreur Nodemailer directe :', error);
    throw new AppError("L'envoi de l'email a échoué. Veuillez réessayer plus tard.", 500);
  }
};