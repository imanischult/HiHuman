
//Dependencies
const bcrypt = require('bcrypt');
var db = require("../models");
// var app = express();

//this should go in the login route; I imagine. 

function login(email, password, callback) {
   
  
    db.User.findOne({
        where: {
            email: email,
        }}).then(function(err, results) {
      if (err) return callback(err);
      if (results.length === 0) return callback(new WrongUsernameOrPasswordError(email));
      const user = results[0];
  
      bcrypt.compare(password, user.password, function(err, isValid) {
        if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));
  
        callback(null, {
          user_id: user.id.toString(),
          username: user.username,
          email: user.email
        });
      });
    });
  }