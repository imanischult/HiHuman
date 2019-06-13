
//Dependencies
const bcrypt = require('bcrypt');
var db = require("../models");


//0Auth login
module.exports = function (app) {
  app.get("/login", function login(email, password, callback) {

    db.User.findOne({
      where: {
        email: email,
      }
    }).then(function (err, results) {
      if (err) return callback(err);
      if (results.length === 0) return callback(new WrongUsernameOrPasswordError(email));
      const user = results[0];

      bcrypt.compare(password, user.password, function (err, isValid) {
        if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

        callback(null, {
          user_id: user.id.toString(),
          username: user.username,
          email: user.email
        });
      });
    });
  });

  //create a new user with 0Auth
  app.get("/sign-up", function create(user, callback) {
    bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) return callback(err);
  
      const insert = {
        password: hash,
        email: user.email
      };

      db.User.create(user, insert).catch(function(err, results) {
        if (err) return callback(err);
        if (results.length === 0) return callback();
        callback(null)}).then(function(user){
          //add firstName, Last Name here, I assume. IDK.

        })

    })
  
  })
}
    
  
  

  // app.create("/api/users", function (req, res) {
  //   // Create a new user
  //   User.create({ 
  //     firstName: req.body.firstName,
  //     LastName: req.body.lastName,
  //     username: req.body.username,
  //     email: req.body.email,

  //   }).then(user => {
  //     console.log("new user ID:", user.id);
  //   });
  // })