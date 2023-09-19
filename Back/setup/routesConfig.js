const bodyParser = require('body-parser');
const userRoutes = require('../routes/api-user')
const postRoutes = require('../routes/api-post')


module.exports = (app) => {
    app.use(
        bodyParser.json(),
        userRoutes,
        postRoutes
    )
} 