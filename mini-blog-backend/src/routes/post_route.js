const router = require('express').Router();
const { authenticateToken } = require('../utils/auth');
const postController = require('../controllers/post_controller');
const { upload } = require('../controllers/post_controller') 

router.get('/',postController.getAllPosts);
router.get('/:id', authenticateToken, postController.getPostById);
router.get('/category/:category', postController.getPostsByCategory); 
router.post('/', authenticateToken, upload.single('image'), postController.createPost);
router.put('/:id', authenticateToken, upload.single('image'), postController.updatePost);
router.delete('/:id', authenticateToken, postController.deletePost);

module.exports = router;
