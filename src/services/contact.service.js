import https from 'https';

export const sendContactEmail = async ({ name, email, message }) => {
  const auth = Buffer.from(`${process.env.MAIL_USER}:${process.env.MAIL_PASS}`).toString('base64');
  
  const data = JSON.stringify({
    Messages: [{
      From: { Email: "yonna.s.merlini@gmail.com", Name: "Portfolio Yonna" },
      To: [{ Email: process.env.MAIL_TO }],
      Subject: `Nouveau message de ${name}`,
      HTMLPart: `<h3>Message de ${name}</h3><p>${message}</p>`
    }]
  });

  const options = {
    hostname: 'api.mailjet.com',
    path: '/v3.1/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
      'Content-Length': Buffer.byteLength(data)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(true);
        else reject(new Error("Erreur Mailjet: " + res.statusCode));
      });
    });

    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
};