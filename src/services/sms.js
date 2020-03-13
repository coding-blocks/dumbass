const axios = require('axios')

module.exports.sendSms = async(mobile, messageText) => {
  const response = await axios.get('http://sms.smscollection.com/sendsmsv2.asp',{
    params: {
      user: process.env.MOBILE_VERIFY_USERNAME,
      password: process.env.MOBILE_VERIFY_PASS,
      sender: 'CDGBLK',
      text: messageText,
      PhoneNumber: mobile.replace("+", "").replace("-", "")
    }
  })
  if(response.data.includes("Message Submitted"))
    return response

  throw new Error(response.data)
}