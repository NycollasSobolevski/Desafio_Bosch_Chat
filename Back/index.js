const express = require('express')
const router = require('./setup/routesConfig')
const app = express()
require('./setup/db')()

router(app)

const port = 8000
const server = app.listen(port, () => console.log(`Started: http://localhost:${port}`))

module.exports = server