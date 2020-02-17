const Joi = require('@hapi/joi')

const POST = function (req, res, next) {
  const schema = Joi.object({
    mobile: Joi.string().length(10),
    email: Joi.string().email(),
    template: Joi.string(),
    dialCode: Joi.string(),
    payload: Joi.object()
  })

  try {
    schema.validate(req.body)
    next()
  } catch (err) {
    res.status(400).json(err)
  }
}



module.exports = { POST }
