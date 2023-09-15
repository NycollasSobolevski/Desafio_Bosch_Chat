const express = require('express')
const router = express.Router();
const PostController = require('../controllers/ForumController')

router
    .get('/forum/', PostController.getAll)
    .post('/forum/', PostController.create)

module.exports = router