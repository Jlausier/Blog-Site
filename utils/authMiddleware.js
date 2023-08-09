const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      // User is authenticated
      next();
    } else {
      // User is not authenticated, redirect to login
      res.redirect('/login');
    }
  };
  
  module.exports = isAuthenticated;