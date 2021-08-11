const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { loginValidate, registerValidate } = require('./validate')

const userController = {

    // Register function
    register: async function(req, res) {

        // check user datas
        const {error} = registerValidate(req.body)
        if(error){ return res.status(400).send(error)}

        // Check if there is already an equal email
        const selectedUser = await User.findOne({email: req.body.email})
        if(selectedUser) return res.status(400).send("E-mail already registered")

        // If there is no error, then a new user is created
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })

        try {
            const savedUser = await user.save()
            res.send(savedUser)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    login: async function(req, res) {
        // check user datas
        const {error} = loginValidate(req.body)
        if(error){ return res.status(400).send(error)}

        // Check user email
        const selectedUser = await User.findOne({email: req.body.email})
        if(!selectedUser) return res.status(400).send("Invalid email or password")

        // Check password 
        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
        if(!passwordAndUserMatch) return res.status(400).send("Invalid email or password")

        // Generate a token based on the user ID
        const token = jwt.sign({_id: selectedUser._id, admin: selectedUser.admin}, process.env.TOKEN_SECRET)

        // Send token
        res.header('authorization-token', token)

        res.send('User logged in')
    },
    find: async function(req, res) {
        
        const users = await User.find()
        if(!users){
            res.send('Não há usuários cadastrados no momento')
        }
        res.send(users)
    }
}

module.exports = userController