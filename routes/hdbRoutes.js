var express = require("express");
var secured = require("../controllers/secured");
var router = express.Router();
var db = require("../models");





router.get("/", (req, res) => {
    if (req.user) {
        console.log(req.user);
        res.render("home", {isLoggedIn: true, buttonData: "Your Profile" });
    } else {
        res.render("home", {isLoggedIn: false, buttonData: "Login/Signup" });
    }
});

router.get("/friends", secured(), function (req, res) {

    res.render("userFriends", {isLoggedIn: true});
});

router.get("/activities", secured(), function (req, res) {

    res.render("userActivities", {isLoggedIn: true});
});

router.get("/newActivity", secured(), function (req, res) {

    res.render("newActivity");
});

router.get("/users/:id", secured(), function (req, res) {
    //find the user by the user_id. for this to work, when we populate a friend, we'll need to save their ID from the db as a datavalue. When you click on a friend, it will need to go to /users/${this.id} in the javascript (/public/app.js). 
    db.User.findOne({
        where: { id: req.params.id },
        // attributes: ['id', ['name', 'title']]
    }).then(user => {

        res.render("userProfile", {
        isLoggedIn: true,    
        title: `${user.name}'s Profile page`,
        //we will need to add handling above here to select whether the fullname here is the userProfile.displayname from Auth0, or the username from the DB.
        fullname: user.name,
        username: user.username,
        profileImg: user.profilePicture

        });
    })
});

router.get("/update", secured(), function (req, res) {

    res.render("userProfileUpdate");
});

module.exports = router;
