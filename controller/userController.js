const bcrypt = require('bcrypt');
const { User } = require('../models'); // Import your User model



exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    await User.create({ username, password: hashedPassword });

    // Redirect to login page after successful signup
    res.redirect('/login');
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Store user information in the session
    req.session.user = user;

    // Redirect to dashboard after successful login
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.logout = (req, res) => {
  // Clear the session and redirect to the homepage
  req.session.destroy(() => {
    res.redirect('/');
  });
};
