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
        db.User.findOne({
            where: {
                id: req.user.id
            }, include: ["favorites", "toTry"]
        }).then(function(user){
            var capitalName = user.name[0].toUpperCase() + user.name.substring(1)
            res.render("dashboard", {name: capitalName, user: user.dataValues});
        })
    });

    app.get("/homepage", function (req, res) {
        res.render("homepage")
    });

    app.get("/types", function (req, res) {
        res.render("type");
    });

    app.get("/flavor", function (req, res) {
        res.render("flavor")
    });

    app.get("/ratings", function (req, res) {
        db.Alcohol.findAll({
            where: {
                rating: 5
            }
        }).then(function (dbAlcohol) {
            console.log(dbAlcohol);
            res.render("rating", {results: dbAlcohol})
        });
    });

    app.get("/underage", function (req, res) {
        res.sendFile(path.join(__dirname, "../views/html/underage.html"));
    });

    app.get("/location", function (req, res) {
        res.sendFile(path.join(__dirname, "../views/html/location.html"))
    });

    app.get("/rate/:AlcoholId", function (req, res) {
        db.Alcohol.findOne({
            where: {
                id: req.params.AlcoholId
            }
        }).then(function(alcoholData){

            res.render("ratealcohol", { alcohol: alcoholData.dataValues });
        })
    })
};