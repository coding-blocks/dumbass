const express = require('express')
const app = express()

const routes = require('./routes')
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(routes)

app.listen(PORT, function () {
  console.log("Listening on port", PORT)
})