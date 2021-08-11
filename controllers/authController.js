const jwt = require('jsonwebtoken')

// Function that validates the token
module.exports = function (req, res, next) {
    const token = req.header('authorization-token')
    if(!token) return res.status(401).send('Você não está autênticado')

    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = userVerified
        next()
    } catch (error) {
        res.status(401).send('TEM TOKEN, MAS TA DANDO MERDA')
    }
}
