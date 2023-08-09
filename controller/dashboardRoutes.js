const { BlogPost } = require('../models'); // Import BlogPost model

exports.getDashboard = async (userId) => {
  try {
    const posts = await BlogPost.findAll({
      where: { user_id: userId },
      order: [['createdAt', 'DESC']],
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

exports.createPost = async (userId, title, contents) => {
  try {
    await BlogPost.create({
      user_id: userId,
      title,
      contents,
    });
  } catch (error) {
    throw error;
  }
};

exports.deletePost = async (postId) => {
  try {
    await BlogPost.destroy({ where: { id: postId } });
  } catch (error) {
    throw error;
  }
};
