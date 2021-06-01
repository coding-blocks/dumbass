const Mustache = require('mustache')
module.exports.generateOtp = () => Math.floor(100000 + Math.random() * 900000); //creates a 6 digit random number.

module.exports.getOtpMessageText = function (otp, template = `{{code}} is the OTP for Mobile Verification valid for 10 mins. Do not share it with anyone. \n-Coding Blocks`) {
  return Mustache.render(template, { code: otp })
}