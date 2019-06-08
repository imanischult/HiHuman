//this is the file that contains the routes what interact with the database, and display data on pages.

// Dependencies
// =============================================================

// require the various data we're pulling here, per Sequelize. Example: 
var User = require("../models/user.js");


// Routes
// =============================================================

module.exports = function(app) {

    // Get a user profile...
    app.get("/api/users/:user_id", function(req, res) {
        //find the user by the user_id
      User.findOne({}).then(function(results) {
          //display the result data on the profile page, in the appropriate areas. 
        res.json(results);
      });
  
    });
  
    // Add a chirp
    app.post("/api/new", function(req, res) {
  
      console.log("Chirp Data:");
      console.log(req.body);
  
      Chirp.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
      }).then(function(results) {
        // `results` here would be the newly created chirp
        res.end();
      });
  
    });
  
  };