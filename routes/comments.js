const express = require('express');
const router = express.Router();
const {authAdmin} = require('../middleware/auth');
const {createComment, updateComment, deleteComment} = require('../controllers/comments');

router.post('/', createComment);
router.put('/:commentId', authAdmin, updateComment);
router.delete('/:commentId', authAdmin, deleteComment);

module.exports = router