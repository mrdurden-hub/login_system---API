const express = require('express')
const router = express.Router()
const auth = require('../controllers/authController')

// Admin Route - Check if user is Admin
router.get('/', auth, (req, res) => {
    if(req.user.admin){
        res.send('Exclusive content for administrators')
    }else{
        res.status(401).send('NOT ADMIN: Access Denied')
    }
})

module.exports = router