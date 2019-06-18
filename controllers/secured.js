module.exports = function() {
  return function secured(req, res, next) {
    if (req.user) {
      return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
  };
};

// This is how auth0 knows when a user is logged out and where to direct them
