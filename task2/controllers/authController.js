const User = require('../models/User')

const bcrypt = require('bcryptjs')

class authController {
    async registration(request, response) {
        try {
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

        } catch(e) {
            response.status(400).json({message: 'Bad request'})
        }
    }
}

module.exports = new authController()