const axios = require('axios')

module.exports.sendSms = (mobile, messageText, templateId) => {
  console.log(messageText)
  return axios.get('http://sms.smscollection.com/sendsmsv2.asp',{
    params: {
      user: process.env.MOBILE_VERIFY_USERNAME,
      password: process.env.MOBILE_VERIFY_PASS,
      sender: 'CDGBLK',
      text: messageText,
      phonenumber: mobile.replace("+", "").replace("-", ""),
      dlttemplateid: templateId
    }
  })
}