const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contents: {
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
  },
  {
    sequelize,
    modelName: 'blogpost',
  }
);
BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  
  BlogPost.hasMany(Comment, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE',
  });
module.exports = BlogPost;