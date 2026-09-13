import https from 'https';

export const sendContactEmail = async ({ name, email, message }) => {
  const auth = Buffer.from(
    `${process.env.MAIL_USER}:${process.env.MAIL_PASS}`
  ).toString('base64');

  const data = JSON.stringify({
    Messages: [
      {
        From: {
          Email: 'contact@yonnamerlini.com',   // ✅ domaine vérifié = plus de spam
          Name: 'MRLN Agency'
        },
        To: [
          {
            Email: process.env.MAIL_TO
          }
        ],
        ReplyTo: {                            // ✅ réponds directement au visiteur
          Email: email,
          Name: name
        },
        Subject: `Nouveau message de ${name}`,
        TextPart: `Message de ${name} (${email})\n\n${message}`,  // ✅ version texte
        HTMLPart: `
          <h3>Message de ${name}</h3>
          <p><strong>Email :</strong> ${email}</p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      }
    ]
  });

  const options = {
    hostname: 'api.mailjet.com',
    path: '/v3.1/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
      'Content-Length': Buffer.byteLength(data)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(true);
        } else {
          reject(new Error(`Erreur Mailjet: ${res.statusCode} - ${body}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
};