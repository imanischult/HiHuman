/* eslint-disable no-console */
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser")
var apiRouter = require("./routes/apiRoutes.js");
var authRouter = require("./routes/authRoutes.js");
var userRouter = require("./routes/userRoutes.js")
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
  function (accessToken, refreshToken, extraParams, profile, done) {
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
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


// Sets up the Express App
// =============================================================

var PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.get("/", (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.render("home", { isLoggedIn: true, buttonData: "Your Profile" });
  } else {
    res.render("home", { isLoggedIn: false, buttonData: "Login/Signup" });
  }
});
// Routes
// =============================================================
app.use("/", userRouter);
app.use("/api", apiRouter);
app.use("/", authRouter);
app.use(userInViews());


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
