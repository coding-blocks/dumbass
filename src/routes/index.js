const otpRouter = require('./otp')
const { Router } = require('express')
const route = Router()

route.use('/otp', otpRouter)

module.exports = route