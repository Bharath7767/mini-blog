const comment_crud = require('./../crud/comments_crud');

const getCommentByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const comment = await comment_crud.getCommentByPostId(postId);
    if (!comment || comment.length === 0) return res.status(404).json({ error: 'Comment not found' });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;

    if (!postId || !content) {
      return res.status(400).json({ error: "Post ID and content are required" });
    }

    const userId = req.user ? req.user.id : null;  

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const comment = await comment_crud.createComment({
      postId,
      userId,
      content
    });

    if (comment) {
      res.status(201).json(comment);
    } else {
      res.status(400).json({ error: "Failed to create comment" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComment,
  // getAllComments,
  getCommentByPostId,
};
