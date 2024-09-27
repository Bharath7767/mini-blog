const { Post } = require('../models/post');
const db_factory = require('../utils/db_factory');
const { User } = require('../models/user');

const getAllPosts = async () => {
  try {
    return await db_factory.getAllRecords(Post, User, [['createdAt', 'DESC']]);
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    throw new Error('Error fetching posts');
  }
};

const getPostById = async (id) => {
  try {
    return await db_factory.getRecordById(Post, id, [{ model: User, attributes: ['name'] }]);
  } catch (error) {
    console.error(`Error in getPostById for id ${id}:`, error);
    throw new Error('Error fetching post');
  }
};

const getPostsByCategory = async (category) => {
  try {
    return await db_factory.getPostsByCategory(Post, category, [{ model: User, attributes: ['name'] }]);
  } catch (error) {
    console.error(`Error in getPostsByCategory for category ${category}:`, error);
    throw new Error('Error fetching posts by category');
  }
};

const createPost = async (data) => {
  try {
    if (!data.userId) {
      throw new Error('UserId is required');
    }
    return await db_factory.createRecord(Post, data);
  } catch (error) {
    console.error('Error in createPost:', error);
    throw new Error('Error creating post');
  }
};

const updatePost = async (id, data) => {
  try {
    return await db_factory.updateRecord(Post, id, data);
  } catch (error) {
    console.error(`Error in updatePost for id ${id}:`, error);
    throw new Error('Error updating post');
  }
};

const deletePost = async (id) => {
  try {
    return await db_factory.deleteRecord(Post, id);
  } catch (error) {
    console.error(`Error in deletePost for id ${id}:`, error);
    throw new Error('Error deleting post');
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByCategory,
  createPost,
  updatePost,
  deletePost
};
