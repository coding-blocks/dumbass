const { Router } = require('express')
const validators = require('./validator')
const controller = require('./controller')
const passport = require('../../passport')
const route = Router()

route.get('/', validators.POST, (req, res) => {
  res.send('OK. Get this')
})

route.use(passport.initialize())
route.use(passport.authenticate('bearer',{session:false}))
route.get('/:id', controller.handleGetById)
route.post('/send', validators.POST, controller.handleSendOtp)
route.post('/:id/verify', controller.handleVerifyOtp)
route.delete('/:id', controller.handleDeleteById)

module.exports = route
