/* eslint-disable no-console */
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var apiRouter = require("./routes/apiRoutes.js");
var authRouter = require("./routes/authRoutes.js");
var userRouter = require("./routes/userRoutes.js");
var hdbRouter = require("./routes/hdbRoutes.js");
var userInViews = require("./controllers/userInViews");
var session = require("express-session");
var dotenv = require("dotenv");
var passport = require("passport");
var Auth0Strategy = require("passport-auth0");
dotenv.config();
var db = require("./models");
var app = express();

const crypto = require("crypto");
const id = crypto.randomBytes(16).toString("hex");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// config express-session
var sess = {
  secret: id,
  cookie: {},
  resave: false,
  saveUninitialized: true
};

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(app.get("env"));

if (app.get("env") === "production") {
  sess.cookie.secure = true; // serve secure cookies, requires https
}
app.use(session(sess));

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:8080/callback"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

// You can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Sets up the Express App
// =============================================================

var PORT = process.env.PORT || 8080;

app.use(express.static("public"));


// Routes
// =============================================================
app.use("/", userRouter);
app.use("/api", apiRouter);
app.use("/", authRouter);
app.use("/", hdbRouter);
app.use(userInViews());

module.exports = app;

// Syncing our sequelize models and then starting our Express app
// =============================================================
<<<<<<< HEAD
db.sequelize
  .sync({ force: true, match: /_tests$/ }) //match: /_tests$/ prevents the DROP db code //
  .catch(function(err) {
    console.log(err + " this is not a test.");
    // app.listen(PORT, function () {
    //   console.log("App listening on PORT " + PORT);
    // });
  })
  .then(function() {
    //changed the above to only drop everything when the server restarts and refresh if the db name ends in _test. You can change this in the config/config.json
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
=======
db.sequelize.sync({ force: true, match: /_tests$/ }).catch(function(err){ //, match: /_tests$/ for making the db stable.
  console.log(err + " this is not a test.");
  // app.listen(PORT, function () {
  //   console.log("App listening on PORT " + PORT);
  // });
}).then(function () { 
  //changed the above to only drop everything when the server restarts and refresh if the db name ends in _test. You can change this in the config/config.json
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
>>>>>>> b738cbef1867da8ee96ed9d2075ed336a40afa8e
  });
