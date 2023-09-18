const express = require('express')
const router = require('./setup/routesConfig')
const app = express()
const cors = require('cors')
require('./setup/db')()

app.use(cors({
  origin:'*'
}));
router(app)

const port = 8000
const server = app.listen(port, () => console.log(`Started: http://localhost:${port}`))

module.exports = server