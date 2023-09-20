const express = require('express')
const router = express.Router();
const PostController = require('../controllers/PostController')

router
    .post('/post/getAll/:page', PostController.getAll)
    .post('/post/create', PostController.create)
    .post('/post/delete', PostController.delete)
    .post('/post/comment', PostController.addComment)

module.exports = router