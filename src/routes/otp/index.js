const { Router } = require('express')
const validators = require('./validator')
const controller = require('./controller')
const passport = require('../../passport')
const route = Router()

route.get('/', validators.POST, (req, res) => {
  res.send('OK. Get this')
})

route.use(passport.initialize())
route.get('/:id', passport.authenticate('bearer',{session : false}), controller.handleGetById)
route.post('/send', passport.authenticate('bearer',{session : false}), validators.POST, controller.handleSendOtp)
route.post('/:id/verify',passport.authenticate('bearer',{session : false}), controller.handleVerifyOtp)
route.delete('/:id', passport.authenticate('bearer',{session : false}), controller.handleDeleteById)

module.exports = route
