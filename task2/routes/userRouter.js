const Router = require('express')
const router = new Router()

router.get('/me')
router.delete('/me')
router.patch('/me')

module.exports = router