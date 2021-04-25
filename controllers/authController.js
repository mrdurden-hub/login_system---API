const jwt = require('jsonwebtoken')

// Function that validates the token
module.exports = function (req, res, next) {
    const token = req.header('authorization-token')
    if(!token) return res.status(401).send('Access Denied')

    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = userVerified
        next()
    } catch (error) {
        res.status(401).send('Access Denied')
    }
}
