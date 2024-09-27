const router = require('express').Router();

const commentRoute = require('./comments_route');
const postRoute = require('./post_route');
const userRoute = require('./user_route');
const authRoute = require('./auth_route');
const likeRoute = require('./like_route');

router.use('/comments', commentRoute)
router.use('/posts', postRoute)
router.use('/users', userRoute)
router.use('/auth', authRoute)
router.use('/likes', likeRoute)

module.exports = router;

