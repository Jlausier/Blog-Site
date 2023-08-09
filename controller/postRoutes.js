const { BlogPost } = require('../models'); // Import BlogPost model

exports.getAllPosts = async () => {
  try {
    const posts = await BlogPost.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']],
    });
    return posts;
  } catch (error) {
    throw error;
  }
};
