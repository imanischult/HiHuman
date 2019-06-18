var express = require("express");
var secured = require("../controllers/secured");
var router = express.Router();
var db = require("../models");



router.get("/", (req, res) => {
    if (req.user) {
        console.log(req.user);
        res.render("home", { isLoggedIn: true, buttonData: "Your Profile" });
      } else {
        res.render("home", { isLoggedIn: false, buttonData: "Login/Signup" });
      }
  });

router.get("/friends", function(req, res){

    res.render("userFriends");
});

router.get("/activities", function(req, res){

    res.render("userActivities");
});

router.get("/newActivity", function(req, res){

    res.render("newActivity");
});

router.get("/users/:id", function(req, res){
//for this to work, when we populate a friend, we'll need to save their ID from the db as a datavalue. When you click on a friend, it will need to go to /users/${this.id} in the javascript (/public/app.js). 

res.render("userProfile");
});

router.get("/update", function(req, res){

    res.render("userProfileUpdate");
});

module.exports = router;