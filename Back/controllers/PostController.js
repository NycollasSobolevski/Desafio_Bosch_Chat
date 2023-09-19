const Post = require('../model/Post')
const Responses = require('./Responses')
const Decrypt = require('./Decrypt')
const TokenService = require('./TokenService')

class PostController {
    static async getAll (req, res) {
        const { verbose, token } = req.body

        var isLogged = await TokenService.verifyToken(token)
        if (!isLogged)
            return Responses.Unauthorized(req, res)

            
        if (verbose) {
            console.log('forum getall')
            console.log('Your token: ')
            console.log(token)
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

        const { verbose, token } = req.body

        if (verbose) {
            console.log('req: ')
            console.log(req.body)
            console.log('forum create')
        }

        const data = await Decrypt.decrypt(req.body.data)
        const {
            title,
            content,
            anex,
        } = data


        const author = TokenService.getUserByToken(token)

        const post = {
            title: title,
            content: content,
            anex: anex,
            author : author,
            upVotes: [],
            downVotes: [],
            comments : []
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
        const isVerbose = req.body.verbose
        const data = await Decrypt.decrypt(req.body.data, isVerbose)
        
        const {
            id,
            token
        } = data

        if (!TokenService.verifyToken(token, isVerbose)) {
            return Responses.Unauthorized()
        }

        const user = await TokenService.getUserByToken(token, isVerbose)
        
        const postToDelete = await Post.findOne({
            _id : id
        })

        if (postToDelete.author._id != user._id)
            return res.status(401).send({
                message: "try to delete a anothers person post",
                data: {postAuthorId : postToDelete._id, thisId : user._id},
                deleted: false,
                error: true
            })
        
        const _res = await Post.deleteOne({_id : id})
        return res.status(200).send({
            message : "deleted post",
            data : _res,
            deleted : true
        })


    }
}

module.exports = PostController