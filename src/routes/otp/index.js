const { Router } = require('express')
const validators = require('./validator')
const route = Router()

route.get('/', validators.POST, (req, res) => {
  res.send('OK. Get this')
})

route.post('/send', validators.POST, (req, res) => {

})

module.exports = route