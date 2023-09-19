const express = require('express')
const router = express.Router();
const PostController = require('../controllers/PostController')

router
    .get('/post/', PostController.getAll)
    .post('/post/', PostController.create)
    .post('/post/delete', PostController.delete)
    .post('/post/comment', PostController.addComment)

module.exports = router