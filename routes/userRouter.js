const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()
const auth = require('../controllers/authController')

router.get('/alunos', userController.find)

// Register Route
router.post('/register', userController.register)

// Login Route
router.post('/login', userController.login)

module.exports = router