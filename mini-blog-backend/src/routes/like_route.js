const router = require('express').Router();
const { authenticateToken } = require('../utils/auth');
const likeController = require('../controllers/like_controller');

router.post('/:postId', authenticateToken, likeController.createLike);
router.get('/:postId', authenticateToken, likeController.getLikesByPostId);
router.delete('/:postId', authenticateToken, likeController.deleteLike);

module.exports = router;
