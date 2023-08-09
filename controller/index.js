const router = require('express').Router();
const userRoutes = require('../routes/userRoutes');
const blogRoutes = require('../routes/homeRoutes');

router.use('/users', userRoutes);
router.use('/projects', blogRoutes);

module.exports = router;
