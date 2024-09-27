const router = require('express').Router();
const {authenticateToken} = require('../utils/auth')
const userController = require('../controllers/user_controller');


router.get('/', authenticateToken, userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.post('/', authenticateToken,  userController.createUser)
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
