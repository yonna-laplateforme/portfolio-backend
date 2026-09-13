import https from 'https';
import { buildMailTemplate } from '../utils/mailTemplate.js';

export const sendContactEmail = async ({ name, email, message }) => {
  const auth = Buffer.from(
    `${process.env.MAIL_USER}:${process.env.MAIL_PASS}`
  ).toString('base64');

  const data = JSON.stringify({
    Messages: [
      {
        From: {
          Email: 'contact@yonnamerlini.com',
          Name: 'MRLN Agency'
        },
        To: [
          {
            Email: process.env.MAIL_TO
          }
        ],
        ReplyTo: {
          Email: email,
          Name: name
        },
        Subject: `Nouveau message de ${name}`,
        TextPart: `Message de ${name} (${email})\n\n${message}`,
        HTMLPart: buildMailTemplate({
          title: 'Nouveau message du site',
          fields: { Nom: name, Email: email },
          message,
        })
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