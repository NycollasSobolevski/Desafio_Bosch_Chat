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

    static async verifyToken(verbose=false) {
        const token = sessionStorage.getItem('token')

        if (verbose)
            console.log(`Token from session storage: ${token}`)
        
        return jwt.verify(token, process.env.SECRET)
    }
}


module.exports = TokenService