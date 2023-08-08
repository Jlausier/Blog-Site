const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    blogpost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blogpost',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'comment',
  }
);
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  
  Comment.belongsTo(BlogPost, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE',
  });
module.exports = Comment;





