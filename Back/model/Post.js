const mongoose = require('mongoose')


var schema = new mongoose.Schema({
    title: String,
    content: String,
    anex: Object,
    upVotes: [Object],
    downVotes: [Object],
    comments: [ { type : mongoose.Schema.Types.ObjectId, ref: 'Comment' } ],
    author: { type : mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Post = mongoose.model('Post', schema)

module.exports = Post