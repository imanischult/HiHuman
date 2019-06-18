// routes/users.js

var express = require("express");
const Handlebars = require('handlebars');
var secured = require("../controllers/secured");
var router = express.Router();
var db = require("../models");
var current_user = {};



Handlebars.registerHelper('sequelizeGet', function(obj, col) {
  return obj.get(col);
}); 


/* GET user profile. */
router.get("/user", secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  // console.log(req.user);
  db.User.findOne({ //consider changing this to a findAll and add handling if more than one get added somehow.
    where: {
      authId: req.user.user_id,
    }
  }).then(user => {
    if (user) {
      console.log(`user exists! Id is: ${res.dataValues.id}`);
      // res.get('id');
      
    } else {
      //save the relevant auth0 user info into our DB, 
      db.User.create({
        authId: req.user.user_id,
        email: req.user.emails[0].value,
        profilePicture: req.user.picture,
        name: req.user.fullname
      }).then(user => {
        console.log(user.get())
        
        }
     
      )
    

  }});

// console.log(current_user);
res.render("userProfile", {
  isLoggedIn: true,
  // userProfile: JSON.stringify(userProfile, null, 2),
  //rawDB: JSON.stringify(current_user, null, 2),
  title: "Profile page",
  fullname: res.get("name"),
  profileImg: res.get("profilePicture")
});


});



module.exports = router;
