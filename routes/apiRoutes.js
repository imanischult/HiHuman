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


  // Get someone else's user profile
  router.get("/users/:id", secured(), function (req, res) {
    //find the user by the user_id
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      //...display the result data on the profile page, in the appropriate areas.
      res.json(results);
    });
  });


  router.post("/api/users", function(req, res) {
    const { email, firstName, lastName, userName } = req.body;
    if (!userName || !email || !firstName || !lastName) {
      res.status(422);
      res.json({
        message: "Please check inputs and resubmit."
      });
      return;
    } else {
      db.User.create({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email
      })
        .then(user => {
          res.status(201);
          res.json(user);
        })
        .catch(error => {
          res.status(400);
          res.json(error);
        });
    };

    })
    // Create a new user

    //Will need to add logic to call this method after authentication, if there is no matching user in our database.
    

   //Routes for the new modules will go here

  module.exports = router;
