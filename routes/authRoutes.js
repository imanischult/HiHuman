
var express = require('express');
var router = express.Router();
var passport = require('passport');
var dotenv = require('dotenv');
var util = require('util');
var url = require('url');
var querystring = require('querystring');

dotenv.config();

// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), function (req, res) {
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get('/callback', function (req, res, next) {
  passport.authenticate('auth0', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(returnTo || '/user');
    });
  })(req, res, next);
});

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();

  var returnTo = req.protocol + '://' + req.hostname;
  var port = req.connection.localPort;
  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo += ':' + port;
  }
  var logoutURL = new URL(
    util.format('https://%s/logout', process.env.AUTH0_DOMAIN)
  );
  var searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: returnTo
  });
  logoutURL.search = searchString;

  res.redirect(logoutURL);
});

module.exports = router;
  

  // app.create("/api/users", function (req, res) {
  //   // Create a new user
  //   User.create({ 
  //     firstName: req.body.firstName,
  //     LastName: req.body.lastName,
  //     username: req.body.username,
  //     email: req.body.email,

  //   }).then(user => {
  //     console.log("new user ID:", user.id);
  //   });
  // })


// //Dependencies
// const bcrypt = require('bcrypt');
// var db = require("../models");


// //0Auth login
// module.exports = function (app) {
//   app.get("/login", function login(email, password, callback) {

//     db.User.findOne({
//       where: {
//         email: email,
//       }
//     }).then(function (err, results) {
//       if (err) return callback(err);
//       if (results.length === 0) return callback(new WrongUsernameOrPasswordError(email));
//       const user = results[0];

//       bcrypt.compare(password, user.password, function (err, isValid) {
//         if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

//         callback(null, {
//           user_id: user.id.toString(),
//           username: user.username,
//           email: user.email
//         });
//       });
//     });
//   });

//   //create a new user with 0Auth
//   app.get("/sign-up", function create(user, callback) {
//     bcrypt.hash(user.password, 10, function(err, hash) {
//       if (err) return callback(err);
  
//       const insert = {
//         password: hash,
//         email: user.email
//       };

//       db.User.create(user, insert).catch(function(err, results) {
//         if (err) return callback(err);
//         if (results.length === 0) return callback();
//         callback(null)}).then(function(user){
//           //add firstName, Last Name here, I assume. IDK.

//         })

//     })
  
//   })
// }
