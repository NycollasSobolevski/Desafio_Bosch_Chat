const User = require("../model/user")
const Decrypt = require('./Decrypt')
const CryptoJS = require('crypto-js')
const Responses = require('./Responses')
const Token = require('./TokenService')

class UserController {
    static async getAll (req, res) {
        const { verbose } = req.body

        if (verbose)
        {
            console.log('req: ' + req)
            console.log('getall')
        }

        try {
            const data = await User.find()
    
            return res.status(200).send({
                message: 'Tudo Guti!',
                data : data,
            })
        } catch (e) {
            return res.status(500).send({
                error: true,
                message: e.message,
                data: e,
            })
        }
    }

    static async create (req, res) {
        console.log(req.body);
        const { verbose } = req.body

        if (verbose)
        {
            console.log('req: ')
            console.log(req.body)
            console.log('forum create')
        }

        const data = Decrypt.decrypt(req.body.data)

        const {
            name,
            pass,
            photo,
            backPhoto,
            username,
            email
        } = data

        var passH, salt = generatePass(pass)

        const user = {
            name: name,
            pass: passH,
            salt: salt,
            backPhoto: backPhoto,
            photo: photo,
            username: username,
            email: email
        } 


        try {
            const response = await User.create(user)

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

        function generatePass(pass, verbose=false) {
            var salt = CryptoJS.lib.WordArray.random(128 / 8);
            var hash = CryptoJS.MD5(pass, salt);

            if (verbose)
                console.log(`passwordHash: ${hash}\nsalt: ${salt}`)
            
            return hash, salt
        }
    }

    static async update (req, res) {
        console.log('log');
        console.log(req.body)

        const {
            id,
            name,
            pass,
            photo,
            backPhoto,
            username,
        } = req.body

        const oldUser = await User.findById(id)

        if (!oldUser)
            Responses.NotFound(req, res)

        const newUser = {
            name: name ? oldUser.name : name,
            pass: pass ? oldUser.pass : pass,
            photo: photo ? oldUser.photo : photo,
            backPhoto: backPhoto ? oldUser.backPhoto : backPhoto,
            username: username ? oldUser.username : username,
            email: oldUser.email
        }

        return res.status(200).send({
            message: 'tudo guti',
            data : newUser,
            oldData : oldUser
        })
    }

    static async getById(req, res) {
        const { id } = req.body

        if (!id)
            return Responses.BadRequest(req, res)


        try {
            const response = await User.findById(id)

            return res.status(200).send({
                message: 'guti',
                data: response
            })
        } catch (e) {
            return res.status(500).send({
                error: true,
                message: e.message,
                data: e,
            })
        }

        
    }

    static async login(req, res) {
        const data = Decrypt.decrypt(req.body.data, req.body.verbose)
        
        const {
            emailUser,
            password
        } = data

        try {
            var userByEmail = await User.find({ email : emailUser })
            if (!userByEmail)
                userByEmail = await User.find({ username : emailUser })

            if (!userByEmail)
                return Responses.NotFound(req, res)

            salt = userByEmail.salt

            passHash = CryptoJS.MD5(password, salt)

            var isLog;
            userByEmail.pass == passHash? isLog = true : isLog = false

            const token = Token.generate(userByEmail)
            
            return res.status(200).send({
                logged : true,
                token : token,
                data : userByEmail
            })
        } catch (e) {
            return res.status(500).send({
                error : true,
                message : "Internal Server Error"
            })
        }
    }

    
}

module.exports = UserController