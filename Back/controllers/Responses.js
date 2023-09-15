class Responses {
    static BadRequest(req, res) {
        return res.status(400).send({
            error: true,
            message: 'bad request'
        })
    }

    static NotFound(req, res) {
        return res.status(404).send({
            message: 'user not found',
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
}

module.exports = Responses