const { Comment } = require('../models/comment'); 
const db_factory = require('../utils/db_factory'); 

const getAllComments = async () => await db_factory.getAllRecords(Comment);

const getCommentByPostId = async (postId) => {
  return await db_factory.getRecordsByConditions(Comment, { postId }); // Fetch records matching the postId
};



const createComment = async (data) => await db_factory.createRecord(Comment, data);
const updateComment = async (id, data) => await db_factory.updateRecord(Comment, id, data);
const deleteComment = async (id) => await db_factory.deleteRecord(Comment, id);

module.exports = {
  getAllComments,
  getCommentByPostId,
  createComment,
  updateComment,
  deleteComment
};
