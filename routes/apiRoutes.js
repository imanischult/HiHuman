//this is the file that contains the routes what interact with the database, and display data on pages.

// Dependencies
// =============================================================

// require the various data we're pulling here, per Sequelize. Example:
// var User = require("../model/user.js");
var db = require("../model/");

// Routes
// =============================================================

//Profile Page functions

module.exports = function(app) {
  // Get a user profile...
  app.get("/api/users/:id", function(req, res) {
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

  app.post("/api/users", function(req, res) {
    const { email, firstName, lastName, userName } = req.body;
    if (!userName || !email || !firstName || !lastName) {
      res.status(422);
      res.json({
        message: "Please check inputs and resubmit."
      });
      return;
    }
    // Create a new user
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
  });

  //Routes for the new modules will go here

  // app.post("/api/new", function(req, res) {

  // });
};
