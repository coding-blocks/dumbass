const axios = require('axios')

module.exports.sendSms = async(mobile, messageText) => {
  const response = await axios.get('http://transactional.msgadvert.com/http-api.php',{
    params: {
      username: process.env.MOBILE_VERIFY_USERNAME,
      password: process.env.MOBILE_VERIFY_PASS,
      senderid: 'CDGBLK',
      route: 2,
      message: messageText,
      number: mobile.replace("+", "").replace("-", "")
    }
  })
  // if(response.data.includes("Message Submitted"))
  return response

  // throw new Error(response.data)
}