const { getOtpMessageText, generateOtp } = require('utils/otp')
const { createOtp, getOtpById, updateOtpById } = require('services/db')
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

module.exports.handleVerifyOtp = async (req, res, next) => {
  const { code } = req.body
  const otp = await getOtpById(req.params.id)

  if (!otp) {
    return res.status(404).json(new ResponseError('OTP_NOT_FOUND'))
  }
  if (!code) {
    return res.status(400).json(new ResponseError('VALIDATION_ERROR', 'parameter code is required'))
  }

  // otp expires if created more than 5 mins ago
  if ( (new Date() - otp.createdAt) > (5 * 60 * 60 * 1000)  ) {
    return res.status(400).json(new ResponseError('EXPIRED_OTP', 'This OTP is expired. You must generate a new one'))
  }

  if (otp.otp !== code) {
    return res.status(400).json(new ResponseError('INVALID_OTP', 'the otp is invalid'))
  }

  if (otp.verifiedAt)
    return res.status(400).json(new ResponseError('ALREADY_VERIFIED', 'the otp is already consumed'))

  // otp is valid and we update the claim
  await updateOtpById(otp._id, {
    verifiedAt: new Date(),
  })

  res.sendStatus(204)
}

module.exports.handleGetById = async (req, res, next) => {
  const otp = await getOtpById(req.params.id)

  if (!otp)
    return res.sendStatus(404)

  if (!otp.verifiedAt)
    return res.status(403).json(new ResponseError('NOT_VERIFIED', 'OTP is not verified yet. You can only fetch verified, non-consumed OTPs'))

  res.json(otp)
}

module.exports.handleDeleteById = async (req, res) => {
  const otp = await getOtpById(req.params.id)

  if (!otp)
    return res.sendStatus(404)

  await updateOtpById(otp._id, {
    deletedAt: new Date()
  })

  res.sendStatus(204)
}