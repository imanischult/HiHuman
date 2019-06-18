// routes/users.js

var express = require("express");
var secured = require("../controllers/secured");
var complete = require("../controllers/complete");
var router = express.Router();
var db = require("../models");


/* GET user profile. */
router.get("/user", secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  // console.log(req.user);
  db.User.findOne({ //consider changing this to a findAll and add handling if more than one get added somehow.
    where: {
     authId: req.user.user_id,
    }
  }).then(res => {
    if(res) {
      console.log(`user exists!:`);
      return res
    } else {
      //save the relevant auth0 user info into our DB, 
    db.User.create({
      authId: req.user.user_id,
      email: req.user.emails[0].value,
      profilePicture: req.user.picture,
    }).then( user => {
      return user
    })
    }
  }).then( user => {
    console.log(user.dataValues.id);
    //currently, this is the code that is displaying what we see on the profile page at /user. 
    res.render("userProfile", {
      // userProfile: JSON.stringify(userProfile, null, 2),
      title: "Profile page",
      //we will need to add handling above here to select whether the fullname here is the userProfile.displayname from Auth0, or the username from the DB.
      fullname: user.name,
      profileImg: user.profilePicture
    });
  });

      
    });

 

  //this is the part where we update the profile. It'd be good to have it auto trigger after a new user is created in the DB, but let's burn that bridge later.
  // db.User.afterCreate((user) => {
  //   if(!user.name) {
    // router.get("/update", secured(), function(req, res) {
    //   console.log(req);
    //   }, function(err, data) {
    //     if (err) {
    //       return res.status(500).end();
    //     }
    //     // console.log(data);
    //     res.render("userProfileUpdate", data[0]);
  //   }
  // });

// });

module.exports = router;
