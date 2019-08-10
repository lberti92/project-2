var db = require("../models");
var passport = require("passport");
var { ensureAuthenticated, forwardAuthenticated } = require("../config/auth.js");

module.exports = function (app) {
    // Register and post to the User table
    app.post("/users/register", function (req, res) {
        console.log(req.body);
        var { name, email, password, password2 } = req.body;
        var errors = [];

        // check if all fields are filled out
        if (!name || !email || !password || !password2) {
            errors.push({ msg: "All fields are required" });
        }

        // check if passwords match
        if (password !== password2) {
            errors.push({ msg: "Passwords do not match" });
        }

        if (errors.length > 0) {
            res.render("register", {
                errors,
                name,
                email,
                password,
                password2
            })
        } else {
            // Passed validation
            // Check if the email is already in use
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (user) {
                    // user exists, add an error message
                    errors.push({ msg: "Email is already registered" });
                    res.render("login", {
                        errors,
                        email,
                    });
                } else {
                    var newUser = {
                        name,
                        email,
                        password
                    }

                    db.User.create(newUser).then(function (user) {
                        req.flash("success_msg", "You are now registered and can log in");
                        res.redirect("/users/login", 200);
                    }).catch(function (err) {
                        console.log(err);
                        res.json(err);
                    });
                }
            })
        }
    })

    // Login Handle 
    app.post("/users/login", passport.authenticate("local", {
        successRedirect: "/users/dashboard",
        failureRedirect: "/users/login"
    }), function (req, res) {
        res.json(req.user.id)
    });


    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    app.post("/favorite/:distId", ensureAuthenticated, function (req, res) {
        var userId = req.user.id;
        var distId = req.params.distId;
        db.User.findOne({
            where: {
                id: userId
            }, include: ["favorites"] //favorites is the alias for the table where favorites are stored
        }).then(function (user) {
            console.log(user);
            user.addFavorites(distId)
                .then(function (response) {
                    res.json(response);
                })
                .catch(function (err) {
                    console.log(err)
                })
        })
    });

    app.post("/save/:distId", ensureAuthenticated, function (req, res) {
        var userId = req.user.id;
        var distId = req.params.distId;
        db.User.findOne({
            where: {
                id: userId
            }, include: ["toTry"] // alias where the distilleries are stored
        }).then(function (user) {
            console.log(user);
            user.addToTry(distId)
                .then(function (response) {
                    console.log(response);
                    res.json(response);
                })
                .catch(function (err) {
                    console.log(err)
                })
        })
    });

    app.post("/rate/:AlcoholId", ensureAuthenticated, function (req, res) {
        db.UserRating.create({
            rating: req.body.rating,
            comment: req.body.comment,
            AlcoholId: req.body.AlcoholId,
            UserId: req.user.id
        }).then(function (rating) {
            res.json(rating);
        })
    });

    //  Removing a favorite
    app.delete("/users/favorite/:distId", ensureAuthenticated, function (req, res) {
        db.Favorite.destroy({
            where: {
                distId: req.params.distId,
                userId: req.user.id
            }
        }).then(function (alcohol) {
            res.json(alcohol);
        })
    });

    //  Removing a saved
    app.delete("/users/save/:distId", ensureAuthenticated, function (req, res) {
        db.ToTry.destroy({
            where: {
                DistilleryId: req.params.distId,
                UserId: req.user.id
            }
        }).then(function (alcohol) {
            res.json(alcohol);
        })
    });

    app.get("/users/ratings/:UserId", function (req, res) {
        db.User.findOne({
            where: {
                id: req.params.UserId
            }, include: [db.UserRating]
        }).then(function (userRatings) {
            res.json(userRatings);
        })
    });

    app.get("/users/:id", function (req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            }, include: ["favorites", "toTry"]
        }).then(function (user) {
            res.json(user);
        })
    });
};