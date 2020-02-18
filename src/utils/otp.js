const Mustache = require('mustache')
module.exports.generateOtp = () => Math.floor(100000 + Math.random() * 900000); //creates a 6 digit random number.

module.exports.getOtpMessageText = function (otp, template = 'Your OTP is: {{code}}') {
  return Mustache.render(template, { code: otp })
}