const express = require('express')
const router = express.Router();
const UserController = require('../controllers/UserController')

router
    .get('/user/', UserController.getAll)
    .post('/user/', UserController.getById)
    .post('/user/add', UserController.create)
    .post('/user/login', UserController.login)

module.exports = router