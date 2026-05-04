const sg = require('@sendgrid/mail');

sg.setApiKey(process.env.SENDGRID_KEY)
// sg.setSubstitutionWrappers('{{', '}}')

module.exports.sendEmail = (email, messageText) => {
  const senderEmail = process.env.SENDGRID_SENDER_EMAIL || 'mailer@online.codingblocks.com'
  const senderName = process.env.SENDGRID_SENDER_NAME || 'CodingBlocks'
  const templateId = process.env.SENDGRID_TEMPLATE_ID || 'd-46c64e7fbcb04c279532f1a871d8862d'
  return sg.send({
    from: `${senderName} <${senderEmail}>`,
    templateId,
    to: email,
    subject: 'Your OTP',
    dynamic_template_data: { messageText }
  })
}