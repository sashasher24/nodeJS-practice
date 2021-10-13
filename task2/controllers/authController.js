const User = require('../models/User')

const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

const generateAccessToken = (id) => {
    const payload = {id}

    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(request, response) {
        try {
            const errors = validationResult(request)
            if(!errors.isEmpty()) {
                return response.status(400).json({message: 'Bad request'});
            }

            const {username, password} = request.body;

            const hashedPassword = bcrypt.hashSync(password, 7)
            const user = new User({username, password: hashedPassword})

            await user.save()
            response.status(200).send({message: 'Success'})
        } catch(e) {
            response.status(400).json({message: 'Bad request'})
        }
    }

    async login(request, response) {
        try {
            const errors = validationResult(request)
            if(!errors.isEmpty()) {
                return response.status(400).json({message: 'Bad request'});
            }

            const {username, password} = request.body

            const user = await User.findOne({username})
            if(!user) {
                return response.status(400).json({message: 'Bad request1'})
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return response.status(400).json({message: 'Bad request2'})
            }

            const token = generateAccessToken(user._id)

            return response.status(200).json({
                message: "Success",
                jwt_token: token
            })
        } catch(e) {
            console.log(e)
            response.status(400).json({message: 'Bad request3'})
        }
    }
}

module.exports = new authController()