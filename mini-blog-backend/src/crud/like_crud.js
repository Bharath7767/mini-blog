const { Like } = require('../models/likes');
const db_factory = require('../utils/db_factory')

const createLike = async (postId, userId) =>{
    try {
    return await db_factory.createRecord(Like, { postId, userId });
    } catch (error) {
        console.error('Error while creating like:',error)
        throw error;
    }
};
const getLikesByPostId = async (postId) =>{
  try {
    return await db_factory.getAllRecords(Like, { where: { postId } });
  } catch (error) {
    console.error('Error fetching likes for post:',error)
    throw error;
  }  
}; 
const deleteLike = async (postId, userId) =>{
    try {
        return await db_factory.deleteRecord(Like, { where: { postId, userId } });
    } catch (error) {
        console.error('Error while deleting like:',error)
        throw error;
    }
} 

module.exports = {
    createLike,
    getLikesByPostId,
    deleteLike,
};
