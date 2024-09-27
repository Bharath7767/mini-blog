const router = require('express').Router();
const {authenticateToken} = require('../utils/auth');
const commentsController = require('../controllers/comments_controller');

// router.get('/', authenticateToken, commentsController.getAllComments);
router.get('/:postId',authenticateToken, commentsController.getCommentByPostId);
router.post('/:postId', authenticateToken, commentsController.createComment); 

module.exports = router;
