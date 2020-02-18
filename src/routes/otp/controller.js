const { getOtpMessageText, generateOtp } = require('utils/otp')
const { createOtp } = require('services/db')
const { sendSms } = require('services/sms')
const { sendEmail } = require('services/email')
const { ResponseError } = require('utils/error')
const sentry = require('@sentry/node')

module.exports.handleSendOtp = async (req, res, next) => {
  // get the message to be sent
  const otp = generateOtp()
  const messageText = getOtpMessageText(otp, req.body.template)

  if (req.body.mobile) {
    // we are sending an sms on mobile
    const { mobile, dialCode = '+91', payload } = req.body

    // create otp in mongo
    const { id: createdOtpId, revert } = await createOtp({
      type: 'mobile',
      mobile: dialCode + mobile,
      message: messageText,
      otp,
      payload
    })

    try {
      await sendSms(dialCode + mobile, messageText)
      res.json({
        id: createdOtpId
      })
    } catch (err) {
      sentry.captureException(err)
      await revert()
      return res.json(new ResponseError('SMS_API_ERROR', "Can't send OTP to that number"))
    }

  } else if (req.body.email) {
    const { email, payload } = req.body

    // create otp in mongo
    const { id: createdOtpId, revert } = await createOtp({
      type: 'email',
      email,
      message: messageText,
      otp,
      payload
    })

   try {
     // send the actual email
     await sendEmail(email, messageText)

     // send back response
     res.json({
       id: createdOtpId
     })
   } catch (e) {
     sentry.captureException(err)
     // revert DB insert
     await revert()
     return res.json(new ResponseError('EMAIL_API_ERROR', "Can't send OTP to that email"))
   }

  } else {
    res.status(400).json(new ResponseError('MOBILE_OR_EMAIL_REQUIRED', 'Either one of mobile and email is required'))
  }
}