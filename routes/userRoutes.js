// routes/users.js

var express = require('express');
var secured = require("../controllers/secured");
var router = express.Router();
var db = require("../models");

/* GET user profile. */
router.get('user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  console.log(req.user);
  db.User.findOne({
    
  })
  
  //check to see if the user exists in the db. If not, route to a finish profile page, post all that crap in the db. 
  // db.User.findOne({
  //   where: {
  //     id : req.body.params
  //   }
  // }).then(function (results) {
    //...display the result data on the profile page, in the appropriate areas. 
    res.render('user', {
        userProfile: JSON.stringify(userProfile, null, 2),
        title: 'Profile page'
      });
  });
  
// });

module.exports = router;
