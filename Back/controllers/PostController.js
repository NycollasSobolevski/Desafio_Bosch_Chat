const Post = require('../model/Post')
const Responses = require('./Responses')
const Decrypt = require('./Decrypt')
const TokenService = require('./TokenService')

const Comment = require('../model/Comment')

class PostController {
    static async getAll(req, res) {
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
                data: data,
            })
        } catch (e) {
            return Responses.Internal(req, res)
        }
    }

    static async create(req, res) {
        const { verbose, token } = req.body

        var isLogged = await TokenService.verifyToken(token)
        if (!isLogged)
            return Responses.Unauthorized(req, res)

        if (verbose) {
            console.log('req: ')
            console.log(req.body)
            console.log('post create')
        }

        // const data = req.body
        const data = await Decrypt.decrypt(req.body.data)
        const {
            title,
            content,
            anex,
        } = data


        const author = await TokenService.getUserByToken(token)

        if (verbose) {
            console.log('Your user Decrypted: ')
            console.log(author)
        }


        const post = {
            title: title,
            content: content,
            anex: anex,
            author: author.id,
            upVotes: [],
            downVotes: [],
            comments: []
        }


        try {
            const response = await Post.create(post)

            return res.status(200).send({
                message: 'Tudo Guti!',
                data: response,
            })
        } catch (e) {
            return res.status(500).send({
                error: true,
                message: e.message,
                data: e,
            })
        }
    }

    static async delete(req, res) {
        const { verbose, token } = req.body

        var isLogged = await TokenService.verifyToken(token)
        if (!isLogged)
            return Responses.Unauthorized(req, res)


        // const data = req.body
        const data = await Decrypt.decrypt(req.body.data, verbose)

        const {
            id,
        } = data


        const user = await TokenService.getUserByToken(token, verbose)
        if (!user)
            return Responses.Unauthorized(req, res)

        const postToDelete = await Post.findOne({
            _id: id
        })
        if (!postToDelete)
            return Responses.NotFound(req, res)

        if (verbose) {
            console.log('Post: ')
            console.log(postToDelete)
            console.log('User: ')
            console.log(user)
        }

        if (postToDelete.author._id != user.id)
            return res.status(401).send({
                message: "try to delete a anothers person post",
                data: { postAuthorId: postToDelete.id, thisId: user.id },
                deleted: false,
                error: true
            })

        const _res = await Post.findByIdAndDelete(id)
        return res.status(200).send({
            message: "deleted post",
            data: _res,
            deleted: true
        })


    }

    static async addComment(req, res) {
        const { verbose, token } = req.body;

        try {
            const user = await TokenService.getUserByToken(token);
            if (!user)
                return Responses.Unauthorized(req, res);

            if (verbose) {
                console.log('Token');
                console.log(token);
                console.log('Logged!');
                console.log(user);
            }

            const data = req.body;
            const { id, content, anex } = data;

            const postToComment = await Post.findById(id);

            if (!postToComment)
                return Responses.NotFound(req, res);

            const comment = {
                author: user.id,
                content: content,
                anex: anex
            };

            const comment_db = await Comment.create(comment)

            const response = await Post.updateOne(
                { _id: id },
                { $push: { comments: comment_db._id } },
                { new: true }
            );

            return res.status(200).send({
                edited: true,
                message: "Success :)",
                data: {
                    before: postToComment,
                    after: response
                }
            });
        } catch (e) {
            console.error(e);
            res.status(500).send({
                error: true,
                message: e.message
            });
        }
    }
}

module.exports = PostController