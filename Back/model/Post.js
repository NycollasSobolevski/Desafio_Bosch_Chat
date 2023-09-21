const mongoose = require('mongoose')


var schema = new mongoose.Schema({
    title: String,
    content: String,
    anex: Object,
    postedAt : Date,
    upVotes: [ { type : mongoose.Schema.Types.ObjectId, ref: 'User' } ],
    downVotes: [ { type : mongoose.Schema.Types.ObjectId, ref: 'User' } ],
    comments: [ { type : mongoose.Schema.Types.ObjectId, ref: 'Comment' } ],
    author: { type : mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Post = mongoose.model('Post', schema)

module.exports = Post