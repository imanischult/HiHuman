var app = require("./app");
var db = require("./model");

var PORT = process.env.PORT || 8080;

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, function() {
    //eslint-disable-line
    console.log("App listening on PORT " + PORT);
  });
});
