const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { User } = require('./user');
const { Post } = require('./post');

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Like, { foreignKey: 'userId', as: 'likes' });

Post.hasMany(Like, { foreignKey: 'postId', as: 'likes' });

Like.sync() 
  .then(() => {
    console.log('Like table has been created or updated.');
  })
  .catch((err) => {
    console.error('Error creating/updating Like table:', err);
  });

module.exports = { Like };
