//this is the file that contains the routes what interact with the database, and display data on pages.

// Dependencies
// =============================================================

// require the various data we're pulling here, per Sequelize. Example: 
var db = require("../models");
var router = require("express").Router();
var secured = require("../controllers/secured");


// Routes
// =============================================================

//Profile Page functions



  // Get a user profile...
  router.get("/api/users/:id", secured(), function (req, res, next) {
    //find the user by the user_id
    db.User.findOne({
      where: {
        id : req.body.params
      }
    }).then(function (results) {
      //...display the result data on the profile page, in the appropriate areas. 
      res.json(results);
    });

  });

module.exports = router;
  //Routes for the new modules will go here


  // app.post("/api/new", function(req, res) {

  // });



// var express = require('express');

// var router = express.Router();

// /* GET user profile. */
// router.get('/user', secured(), function (req, res, next) {
//   const { _raw, _json, ...userProfile } = req.user;
//   res.render('user', {
//     userProfile: JSON.stringify(userProfile, null, 2),
//     title: 'Profile page'
//   });
// });

// module.exports = router;