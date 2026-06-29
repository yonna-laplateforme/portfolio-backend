export const sendContactEmail = async ({ name, email, message }) => {
  const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com', 
    port: 587,
    secure: false, 
    auth: {
      user: process.env.MAIL_USER, 
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Ton Portfolio" <yonna.s.merlini@gmail.com>`, 
    replyTo: email, 
    to: process.env.MAIL_TO,
    subject: `Nouveau message Portfolio de ${name}`,
    text: `Message de : ${name} (${email})\n\n${message}`,
    html: `<h3>Nouveau message</h3><p>${message}</p>`
  };

  await transporter.sendMail(mailOptions);
  return true;
};