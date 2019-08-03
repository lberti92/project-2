// Middleware to ensure that a user is logged-in in order to complete a request
var isAuthenticated = require("../config/auth.js");
var path = require("path");
var db = require("../models");

// Routes
module.exports = function (app) {
    // User html routes
    app.get("/users/register", function (req, res) {
        res.render("register");
    });

    app.get("/users/login", function (req, res) {
        res.render("login");
    });

    app.get("/users/dashboard/:userId?", function (req, res) {
        db.User.findOne({
            where: {
                id: req.params.userId
            }
        }).then(function(user) {
            console.log(user);
            res.render("dashboard", isAuthenticated, user)
        })
    });
  app.get("/users/login", function(req, res) {
      res.render("login");
  });
  app.get("/", function (req,res){
      res.render("homepage");
  })
};
