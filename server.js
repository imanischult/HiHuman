/* eslint-disable no-console */
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
// var db = require("./model");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

//Authorization with 0Auth
//================================================================
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://deadnazi.auth0.com/.well-known/jwks.json'
}),
audience: 'https://hiHumans.com',
issuer: 'https://deadnazi.auth0.com/',
algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
res.send('Secured Resource');
});



// Routes
// =============================================================
// require("./routes")(app);
// Syncing our sequelize models and then starting our Express app
// =============================================================
// db.sequelize.sync({ force: true }).then(function() {

// });
app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
