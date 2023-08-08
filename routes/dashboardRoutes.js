const express = require('express');
const router = express.Router();

const { getDashboard, createPost, deletePost } = require('../controllers/dashboardController');

router.get('/', async (req, res) => {
  try {
    const posts = await getDashboard(req.user.id); // Fetch user's posts
    // Render dashboard view with user's posts
    res.render('dashboard', { posts });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/create', async (req, res) => {
  try {
    await createPost(req.user.id, req.body.title, req.body.contents); // Create new post
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/delete/:postId', async (req, res) => {
  try {
    await deletePost(req.params.postId); // Delete user's post
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;