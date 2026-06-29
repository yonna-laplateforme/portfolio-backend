import Mailjet from 'node-mailjet';

export const sendContactEmail = async ({ name, email, message }) => {
  const mailjet = Mailjet.apiConnect(
    process.env.MAIL_USER, // Ta clé publique
    process.env.MAIL_PASS  // Ta clé privée
  );

  const request = mailjet.post("send", { 'version': 'v3.1' }).request({
    "Messages": [{
      "From": { "Email": "yonna.s.merlini@gmail.com", "Name": "Portfolio Yonna" },
      "To": [{ "Email": process.env.MAIL_TO }],
      "Subject": `Message de ${name}`,
      "TextPart": message,
      "HTMLPart": `<h3>Message de ${name} (${email})</h3><p>${message}</p>`
    }]
  });

  return request.then(() => true).catch((err) => { throw new Error(err.message); });
};