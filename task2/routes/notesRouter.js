const Router = require('express')
const router = new Router()

router.get('/api/notes')
router.post('/api/notes')

router.get('/api/notes/{id}')
router.put('/api/notes/{id}')
router.patch('/api/notes/{id}')
router.delete('/api/notes/{id}')

module.exports = router