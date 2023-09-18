const Post = require('../model/Post')
const Responses = require('./Responses')
const Decrypt = require('./Decrypt')
const TokenService = require('./TokenService')

class PostController {
    static async getAll (req, res) {
        const { verbose } = req.body

        if (verbose) {
            console.log('req: ')
            console.log(req)
            console.log('forum getall')
        }

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

        if (!TokenService.verifyToken())
            return Responses.Unauthorized()

        const { verbose } = req.data

        if (verbose) {
            console.log('req: ')
            console.log(req.body)
            console.log('forum create')
        }

        const data = Decrypt.decrypt(req.body.data)

        const {
            title,
            content,
            anex,
            photo,
            forum,
        } = data

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

    static async delete (req, res) {
        const data = Decrypt.decrypt(req.body.data, req.body.verbose)
        
        const {
            id,
            token
        } = data

        if (!TokenService.verifyToken) {
            return Responses.Unauthorized()
        }

        const res = await Post.deleteOne({_id : id})

        return res.status(200).send({
            message : "deleted post",
            data : res,
            deleted : true
        })
    }
}

module.exports = PostController