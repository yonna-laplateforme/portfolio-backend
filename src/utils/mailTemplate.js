// Template email MRLN Agency — styles inline obligatoires pour les mails
export const buildMailTemplate = ({ title, fields, message }) => {
  const rows = Object.entries(fields)
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #e8e4da;font-family:Courier,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#b3442c;width:180px;vertical-align:top;">${label}</td>
        <td style="padding:10px 0;border-bottom:1px solid #e8e4da;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;vertical-align:top;">${value}</td>
      </tr>`
    )
    .join('');

  const messageBlock = message
    ? `
      <p style="margin:28px 0 10px;font-family:Courier,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#b3442c;">Message</p>
      <div style="background:#f4f1ea;padding:20px;border-left:3px solid #b3442a;font-family:Georgia,serif;font-size:15px;line-height:1.7;color:#1a1a1a;white-space:pre-line;">${message}</div>`
    : '';

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f1ea;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e8e4da;">

          <!-- EN-TÊTE -->
          <tr>
            <td style="padding:36px 40px 24px;">
              <span style="font-family:Georgia,serif;font-style:italic;font-size:28px;color:#1a1a1a;">M<span style="color:#b3442c;">.</span></span>
              <p style="margin:10px 0 0;font-family:Courier,monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#b3442c;">${title}</p>
            </td>
          </tr>
          <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e8e4da;margin:0;"></td></tr>

          <!-- CORPS -->
          <tr>
            <td style="padding:28px 40px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
              ${messageBlock}
            </td>
          </tr>

          <!-- PIED -->
          <tr>
            <td style="padding:20px 40px;background:#1a1a1a;">
              <p style="margin:0;font-family:Courier,monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#f4f1ea;">
                MRLN Agency — Yonna Merlini
              </p>
              <p style="margin:6px 0 0;font-family:Courier,monospace;font-size:10px;letter-spacing:1px;color:#8a8a92;">
                Lyon, France · yonnamerlini.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};