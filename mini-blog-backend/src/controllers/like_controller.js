const {Like} = require('../models/likes')
const like_crud = require('../crud/like_crud')

const createLike = async (req, res) => {
    const userId = req.user.id
    const postId = req.params.postId;
    
    try {
      const existingLike = await Like.findOne({
        where:{
          userId: userId,
          postId: postId
        }
      })
  
      if (existingLike) {
        await existingLike.destroy(); 
        return res.json({ message: 'Like removed' });
       } else {
        await Like.create({ userId, postId });
        return res.json({ message: 'Like added' });
      }
    } catch (error) {
      console.error('Error in createLike handler:', error);
      return res.status(500).json({ message: 'Server error' });
    }
};

const getLikesByPostId = async (req, res) => {
    try {
        const likes = await like_crud.getLikesByPostId({ where: { postId: req.params.postId } });
        res.status(200).json(likes);
    } catch (error) {
        res.status(500).json({message:"error"});
    }
};

const deleteLike = async (req, res) => {
    try {
        const userId = req.body.userId; 
        const postId = req.params.postId;
        if (!userId || !postId) {
            return res.status(400).json({ message: 'User ID and Post ID are required.' });
        }

        const deleted = await like_crud.deleteLike({ where: { userId, postId } });

        if (!deleted) {
            return res.status(404).json({ message: 'Like not found.' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createLike,
    getLikesByPostId,
    deleteLike,
};
