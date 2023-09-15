const mongoose = require('mongoose')

const Post = mongoose.model('Puzzles', {
    title: String,
    content: String,
    anex: Object,
    photo: Object,
    forum: Object,
    upVotes: Object,
    downVotes: Object,
    comments: Object,
    author: Object
})

module.exports = Post