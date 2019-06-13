//this is the file that contains the routes what interact with the database, and display data on pages.

// Dependencies
// =============================================================

// require the various data we're pulling here, per Sequelize. Example: 
var User = require("../models/user.js");


// Routes
// =============================================================

//Profile Page functions

module.exports = function (app) {

  // Get a user profile...
  app.get("/api/users/:id", function (req, res) {
    //find the user by the user_id
    User.findOne({
      where: {
        id : req.body.params
      }
    }).then(function (results) {
      //...display the result data on the profile page, in the appropriate areas. 
      res.json(results);
    });

  });

  app.create("/api/users", function (req, res) {
    // Create a new user
    User.create({ 
      firstName: req.body.firstName,
      LastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,

    }).then(user => {
      console.log("new user ID:", user.id);
    });
  })

  //Routes for the new modules will go here


  // app.post("/api/new", function(req, res) {

  // });

};