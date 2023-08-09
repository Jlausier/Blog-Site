const express = require('express');
const router = express.Router();
const {BlogPost, Comment, User} = require('../models')


router.get('/', async (req, res) => {
  try {
    //retirieve all the posts from the table
    const posts = await BlogPost.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']],
    });
    // get just the object payload from each post
    const postData = posts.map((post) => {
      post.toJSON()
    })
    // hand the plain object to the all view
    res.render('all', {postData})
  } catch (error) {
    throw error;
  }
});

module.exports = router;