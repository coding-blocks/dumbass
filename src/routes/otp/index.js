const { Router } = require('express')
const validators = require('./validator')
const controller = require('./controller')
const route = Router()

route.get('/', validators.POST, (req, res) => {
  res.send('OK. Get this')
})

route.post('/:id/verify', controller.handleVerifyOtp)
route.post('/send', validators.POST, controller.handleSendOtp)

module.exports = route