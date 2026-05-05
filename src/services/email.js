const sg = require('@sendgrid/mail');

sg.setApiKey(process.env.SENDGRID_KEY)

module.exports.sendEmail = (email, messageText) => {
  const senderEmail = process.env.SENDGRID_SENDER_EMAIL || 'mailer@online.codingblocks.com'
  const senderName = process.env.SENDGRID_SENDER_NAME || 'Vidyamandir Classes'

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">
          <tr>
            <td style="background-color:#1a2a6c;padding:24px;text-align:center;">
              <img src="https://dision-api.codingblocks.com/assets/vmc-logo.png" alt="Vidyamandir Classes" style="max-height:60px;max-width:280px;">
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <p style="font-size:16px;color:#333333;margin:0 0 16px;">Dear Student,</p>
              <p style="font-size:16px;color:#333333;margin:0 0 24px;">Use the OTP below to log in to your Vidyamandir Classes account. It is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
              <div style="text-align:center;margin:24px 0;">
                <span style="display:inline-block;background-color:#f0f4ff;border:2px dashed #1a2a6c;border-radius:8px;padding:16px 40px;font-size:36px;font-weight:bold;letter-spacing:8px;color:#1a2a6c;">${messageText}</span>
              </div>
              <p style="font-size:14px;color:#666666;margin:24px 0 0;">If you did not request this OTP, please ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8f8f8;padding:16px 40px;text-align:center;border-top:1px solid #eeeeee;">
              <p style="font-size:12px;color:#999999;margin:0;">© Vidyamandir Classes. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return sg.send({
    from: `${senderName} <${senderEmail}>`,
    to: email,
    subject: 'Your OTP - Vidyamandir Classes',
    html,
    text: messageText,
  })
}