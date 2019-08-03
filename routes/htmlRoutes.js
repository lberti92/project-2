// Middleware to ensure that a user is logged-in in order to complete a request
var { ensureAuthenticated, forwardAuthenticated } = require("../config/auth.js");
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

    app.get("/users/login", function (req, res) {
        res.render("login");
    });
    app.get("/", function (req, res) {
        res.render("homepage");
    });

    app.get('/users/dashboard', ensureAuthenticated, (req, res) =>
        res.render('dashboard', {
            user: req.user
        })
    );

    app.get('/get_user', (req, res) => {
        res.send(req.session)
    });
    app.get("/users/authenticate", ensureAuthenticated, function (req, res) {
        res.render("index");
    });
};
