const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const noteController = require('../controllers/noteController');

router.get('/', authMiddleware, noteController.getUsersNotes);
router.post('/', authMiddleware, noteController.addNoteForUser);
router.get('/:id', authMiddleware, noteController.getUsersNoteById);
router.put('/:id', authMiddleware, noteController.updateUsersNote);
router.patch('/:id', authMiddleware, noteController.checkUsersNote);
router.delete('/:id', authMiddleware, noteController.deleteUsersNote);

module.exports = router;