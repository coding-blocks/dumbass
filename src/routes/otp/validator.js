const Joi = require('@hapi/joi')

const POST = function (req, res, next) {
  const schema = Joi.object().keys({
    mobile: Joi.string().length(10),
    msgTemplate: Joi.string()
                    .valid('MOBILE_VERIFICATION','ACCOUNT_ACCESS')
                    .when('mobile', { is: Joi.exist(), then: Joi.required()}),
    email: Joi.string().email(),
    template: Joi.string(),
    dialCode: Joi.string(),
    payload: Joi.object()
  })

  try {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({message: error.details[0].message})
    }
    next()
  } catch (err) {
    res.status(400).json(err)
  }
}



module.exports = { POST }
