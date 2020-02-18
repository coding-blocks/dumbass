const sg = require('@sendgrid/mail');

sg.setApiKey(process.env.SENDGRID_KEY)
// sg.setSubstitutionWrappers('{{', '}}')

module.exports.sendEmail = (email, messageText) => {
  return sg.send({
    from: "CodingBlocks <mailer@online.codingblocks.com>",
    templateId: 'd-46c64e7fbcb04c279532f1a871d8862d',
    to: email,
    subject: 'Your Coding Blocks OTP',
    dynamic_template_data: { messageText }
  })
}