const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    pass: String,
    salt: Array,
    photo: Object,
    backPhoto: Object,
    username: String,
    email: String,
})

module.exports = User