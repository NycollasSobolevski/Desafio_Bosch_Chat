const mongoose = require('mongoose')


var schema = new mongoose.Schema({
    author: { type : mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    anex: Object
})

const Comment = mongoose.model('Comment', schema)

module.exports = Comment