var express = require("express");
var secured = require("../controllers/secured");
var router = express.Router();
var db = require("../models");


//loads the home page and changes buttons depending on if you are logged in.
router.get("/", (req, res) => {
    if (req.user) {
        console.log(req.user);
        res.render("home", { isLoggedIn: true, buttonData: "Your Profile" });
      } else {
        res.render("home", { isLoggedIn: false, buttonData: "Login/Signup" });
      }
  });

//gets the friend management view
router.get("/friends", function(req, res){

    res.render("userFriends");
});

//gets the activity management view
router.get("/activities", function(req, res){

    res.render("userActivities");
});

//gets the new activity form
router.get("/newActivity", function(req, res){

    res.render("newActivity");
});

//gets an activity page by its id so that users can send a useful link to their friends. Importantly, this route is /not/ secured.
router.get("/activity/:id", function(req, res){

    res.render("userActivities");
})

//gets a user profile by id
router.get("/users/:id", function(req, res){
//for this to work, when we populate a friend, we'll need to save their ID from the db as a datavalue. When you click on a friend, it will need to go to /users/${this.id} in the javascript (/public/app.js). 

res.render("userProfile");
});

//gets the update form
router.get("/update", function(req, res){

    res.render("userProfileUpdate");
});

module.exports = router;