const Mustache = require('mustache')
const messageTemplates = require('templates')


module.exports.generateOtp = () => Math.floor(100000 + Math.random() * 900000); //creates a 6 digit random number.

module.exports.getOtpMessageText = function (otp, templateName = "MOBILE_VERIFICATION") {
  return Mustache.render(messageTemplates[templateName].text, { code: otp })
}