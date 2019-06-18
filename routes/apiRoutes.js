//this is the file that contains the routes what interact with the database.

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


  // Get a user profile that does not belong to the user
  router.get("/api/users/:id", function (req, res) {
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

  //use this for the form we use to get additional info and save in the DB.
  router.put("/api/users", function(req, res) {
    const { name, userName } = req.body;
    //username will be the name that we display here
    if (!userName || !name) {
      res.status(422);
      res.json({
        message: "Please check inputs and resubmit."
      });
      return;
    } else {
      db.User.update({
        name: name,
        userName: userName,
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
   
    

   //Routes for the new modules will go here

  module.exports = router;
