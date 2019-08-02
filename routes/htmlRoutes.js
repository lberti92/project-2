// Middleware to ensure that a user is logged-in in order to complete a request
var isAuthenticated = require("../config/auth.js");
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  app.get("/users/register", function(req, res) {
    res.render("register");
  });

  app.get("/users/login", function(req, res) {
      res.render("login");
  });
  app.get("/", function (req,res){
      res.render("index");
  })
};
