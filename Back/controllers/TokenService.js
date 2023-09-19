const jwt = require('jsonwebtoken')


class TokenService {
    static async generate(data) {
        let secret = process.env.SECRET

        let token = jwt.sign(
            {
                id: data._id
            },
            secret,
            {
                expiresIn: '2 days'
            }
        )
        
        return token
    }

    static async verifyToken(token, verbose=false) {
        if (!token)
            return false

        if (verbose)
            console.log(`Token from session storage: ${sessionStorage.getItem('token')}`)
        
        return jwt.verify(token, process.env.SECRET)
    }

    static async getUserByToken(token, verbose=false) {        
        const user = jwt.decode(token, process.env.SECRET)
        
        if (verbose) {
            console.log(`Token: ${token}`)
            console.log(`User: `)
            console.log(user)
        }
        
        return user
    }
}


module.exports = TokenService