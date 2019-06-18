//this is the file that contains the routes what interact with the database.

// Dependencies
// =============================================================

// require the various data we're pulling here, per Sequelize. Example:
var db = require("../models");
var router = require("express").Router();
var secured = require("../controllers/secured");
var complete = require("../controllers/complete");
var me = complete();


// Routes
// =============================================================

//Profile Page functions

//when a new account is created, we need a post route to the db to add all the infoz.


//use this for the form we use to get additional info and save in the DB.
router.put("/update", secured(), function (req, res) {
  const { name, username, profilePicture } = req.body;
  console.log(req.body);
  //username will be the name that we display here
  if (!username || !name) {
    res.status(422);
    res.json({
      message: "Please check inputs and resubmit."
    });
    return;
  } else {
    db.User.update({
      where: {
        authId : me.user_id
      }
    }, {
      name: name,
      userName: userName,
      profilePicture: profilePicture
    })
    .then(function(user) {
      console.log(user);
      router.get("/user", function (req, res) {

        res.render("userProfile", {
          isLoggedIn: true,
          profile: user,
          title: `${user.get("name")}'s Profile page`,
          //we will need to add handling above here to select whether the fullname here is the userProfile.displayname from Auth0, or the username from the DB.
          fullname: user.get("name"),
          username: user.get("username"),
          profileImg: user.get("profilePicture")
        })
        console.log(user);
        res.status(201);
        res.json(user);
      });
    })
      .catch(error => {
        res.status(400);
        res.json(error);
      })
  }
})

//Create a new Activity

router.post("/activity", secured(), function(req, res) {
  db.User.create({
    name: res.name,
      time: res.time,
      location: res.loc,
      invitees: res.invitees,
      notes: res.notes
  }).then(function (user) {
    res.render("userActivities", {
      user : user,
    })
  })
  
})

module.exports = router;
