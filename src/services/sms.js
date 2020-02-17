const axios = require('axios')

const sendOtp = function (mobile, otp) {
  let messageText =
    otpHash === ''
      ? `${otp} is the OTP for ${otp_purpose} valid for 10 mins. Do not share it with anyone.`
      : `<#> ${otp} is the OTP for ${otp_purpose} valid for 10 mins. Do not share it with anyone. ${otpHash}`


  return axios.post('http://sms.smscollection.com/sendsmsv2.asp',{
    user: secrets.MOBILE_VERIFY_USERNAME,
    password: secrets.MOBILE_VERIFY_PASS,
    sender: 'CDGBLK',
    text: messageText,
    PhoneNumber: mobile.replace("+", "").replace("-", "")
  })
}