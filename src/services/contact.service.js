import Mailjet from 'node-mailjet';
import AppError from '../errors/AppError.js';

export const sendContactEmail = async ({ name, email, message }) => {
  // Initialisation avec tes clés Mailjet (utilisées dans les variables d'environnement sur Render)
  const mailjet = Mailjet.apiConnect(
    process.env.MAIL_USER, // Ta clé API publique
    process.env.MAIL_PASS  // Ta clé secrète
  );

  try {
    const request = await mailjet
      .post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [{
          "From": {
            "Email": "yonna.s.merlini@gmail.com", // DOIT être ton email validé sur Mailjet
            "Name": "Portfolio Yonna"
          },
          "To": [{
            "Email": process.env.MAIL_TO // L'adresse où tu reçois les messages
          }],
          "Subject": `Nouveau message de ${name}`,
          "TextPart": `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
          "HTMLPart": `<h3>Nouveau message</h3>
                       <p><strong>De :</strong> ${name} (${email})</p>
                       <p><strong>Message :</strong><br>${message}</p>`
        }]
      });

    console.log("✅ Email envoyé avec succès via API REST");
    return true;
  } catch (error) {
    console.error("❌ Erreur API Mailjet :", error.statusCode, error.message);
    throw new AppError("L'envoi de l'email a échoué via API.", 500);
  }
};