const express = require('express');
const router = express.Router();

const { getAllPosts } = require('../controller/postController');

router.get('/', async (req, res) => {
  try {
    const posts = await getAllPosts(); // Fetch existing blog posts
    // Render homepage view with posts
    res.render('homepage', { posts });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;