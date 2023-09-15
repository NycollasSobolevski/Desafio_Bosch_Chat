const bodyParser = require('body-parser');
const userRoutes = require('../routes/api-user')
const forumRoutes = require('../routes/api-forum')


module.exports = (app) => {
    app.use(
        bodyParser.json(),
        userRoutes,
        forumRoutes
    )
} 