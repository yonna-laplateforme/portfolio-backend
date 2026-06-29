import Mailjet from 'node-mailjet';
import AppError from '../errors/AppError.js';

export const sendContactEmail = async ({ name, email, message }) => {
  const auth = Buffer.from(`${process.env.MAIL_USER}:${process.env.MAIL_PASS}`).toString('base64');

  const response = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`
    },
    body: JSON.stringify({
      Messages: [{
        From: { Email: "yonna.s.merlini@gmail.com", Name: "Portfolio Yonna" },
        To: [{ Email: process.env.MAIL_TO }],
        Subject: `Nouveau message de ${name}`,
        TextPart: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
        HTMLPart: `<h3>Nouveau message</h3><p><strong>De :</strong> ${name} (${email})</p><p>${message}</p>`
      }]
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ Erreur API Mailjet :", errorData);
    throw new Error("L'envoi de l'email a échoué.");
  }

  console.log("✅ Email envoyé avec succès via Fetch API");
  return true;
};