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

//when a new account is created, we need a post route to the db to add all the infoz.


  // Get a user profile...
  router.get("/users/:id", secured(), function (req, res, next) {
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
