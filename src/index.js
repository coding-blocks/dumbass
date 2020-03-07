if (process.env.NODE_ENV !== 'production')
  require('dotenv').config()

const express = require('express')
const app = express()
const Sentry = require('@sentry/node');
const { dbConnectionReady } = require('services/db')

const routes = require('./routes')
const PORT = 5001

Sentry.init({
  dsn: process.env.SENTRY_DSN
})
app.use(express.json())
app.use(routes)

dbConnectionReady.then(() => {
  app.listen(PORT, function () {
    console.log("Listening on port", PORT)
  })
})
