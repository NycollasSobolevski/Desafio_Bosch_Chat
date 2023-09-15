const Post = require('../model/Post')
const Responses = require('./Responses')

class PostController {
    static async getAll (req, res) {
        const { verbose } = req.body

        if (verbose) {
            console.log('req: ')
            console.log(req)
            console.log('forum getall')
        }

        const { page, itemPerPage } = req.params

        // var p;
        // if (page)
        //     p = page

        // if (!itemPerPage)
        //     return Responses.BadRequest(req, res)

        try {
            const data = await Post.find()
    
            return res.status(200).send({
                message: 'Tudo Guti!',
                data : data,
            })
        } catch (e) {
            return Responses.Internal(req, res)
        }
    }
    
    static async create (req, res) {
        const { verbose } = req.data

        if (verbose) {
            console.log('req: ')
            console.log(req.body)
            console.log('forum create')
        }

        const {
            title,
            content,
            anex,
            photo,
            forum,
        } = req.body

        const post = {
            title: title,
            content: content,
            anex: anex,
            photo: photo,
            forum: forum,
            upVotes: {},
            downVotes: {},
            forum: {}
        } 


        try {
            const response = await Post.create(post)

            return res.status(200).send({
                message: 'Tudo Guti!',
                data : response,
            })
        } catch (e) {
            return res.status(500).send({
                error: true,
                message: e.message,
                data: e,
            })
        }
    }
}

module.exports = PostController