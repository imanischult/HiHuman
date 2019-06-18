module.exports = function() {
  return function(req, res, next) {
    res.locals.user = req.user;
    next();
  };
};

// When we log through auth0, it creates a session. This is how the browser knows who is logged in. It also knows who's profile to show when we go to "/user"
