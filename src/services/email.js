const sg = require('@sendgrid/mail');

sg.setApiKey(process.env.SENDGRID_KEY)
// sg.setSubstitutionWrappers('{{', '}}')

module.exports.sendEmail = (email, messageText) => {
  const senderEmail = process.env.SENDGRID_SENDER_EMAIL || 'mailer@online.codingblocks.com'
  const senderName = process.env.SENDGRID_SENDER_NAME || 'CodingBlocks'
  return sg.send({
    from: `${senderName} <${senderEmail}>`,
    templateId: 'd-46c64e7fbcb04c279532f1a871d8862d',
    to: email,
    subject: 'Your OTP',
    dynamic_template_data: { messageText }
  })
}