const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./usersData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');
// seed data base
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
// for each blog create an id
for (const blogPostData of blogData) {
  const { id: userId } = users[Math.floor(Math.random() * users.length)];

  const createdBlogPost = await BlogPost.create({
    ...blogPostData,
    user_id: userId,
  });
  
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: userId, // Assign the ID of the selected user
      blogpost_id: createdBlogPost.id,
    });
  }
}

  process.exit(0);
};

seedDatabase();
