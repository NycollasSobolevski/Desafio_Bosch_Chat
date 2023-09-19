class Responses {
    static BadRequest(req, res) {
        return res.status(400).send({
            error: true,
            message: 'bad request'
        })
    }

    static NotFound(req, res) {
        return res.status(404).send({
            message: 'Not Found',
            error: true
        })
    }

    static Internal(req, res) {
        return res.status(500).send({
            error: true,
            message: e.message,
            data: e,
        })
    }

    static Unauthorized(req, res) {
        return res.status(401).send({
            message : "dont have permission",
            logged  : false,
            error: true
        })
    }
}

module.exports = Responses