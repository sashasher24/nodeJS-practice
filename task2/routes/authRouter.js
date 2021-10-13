const Router = require('express')
const router = new Router()
const {check} = require('express-validator')

const authController = require('../controllers/authController')

router.post('/register',[
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password cannot be empty').notEmpty(),
] , authController.registration)

router.post('/login', [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password cannot be empty').notEmpty(),
], authController.login)

module.exports = router