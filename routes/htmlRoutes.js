// Middleware to ensure that a user is logged-in in order to complete a request
var { ensureAuthenticated, forwardAuthenticated } = require("../config/auth.js");
var path = require("path");
var db = require("../models");

// Routes
module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index")
    });

    // User Routes
    app.get("/users/register", function (req, res) {
        res.render("register");
    });

    app.get("/users/login", function (req, res) {
        res.render("login");
    });

    app.get("/users/dashboard", ensureAuthenticated, function (req, res) {
        console.log(req.user);
        res.render("dashboard", req.user);
    });

    app.get("/homepage", function (req, res) {
        res.render("homepage")
    });

    app.get("/types", function (req, res) {
        res.render("type")
    });

    app.get("/flavor", function (req, res) {
        res.render("flavor")
    });

    app.get("/ratings", function (req, res) {
        res.render("rating")
    });

    app.get("/underage", function (req, res) {
        res.sendFile(path.join(__dirname, "../views/html/underage.html"));
    });

    app.get("/location", function (req, res){
        res.sendFile(path.join(__dirname, "../views/html/location.html"))
    });
};