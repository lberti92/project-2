var db = require("../models");
var passport = require("passport");

module.exports = function (app) {
    // Login Page
    app.get("/users/login", function (req, res) {
        res.render("login");
    })

    // Register Page
    app.get("/users/register", function (req, res) {
        res.render("register");
    })

    // Register and post to the User table
    app.post("/users/register", function (req, res) {
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
                    res.render("register", {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    var newUser = {
                        name,
                        email,
                        password
                    }

                    db.User.create(newUser).then(function (user) {
                        res.json(user);
                    }).then(function () {
                        res.redirect(307, "/api/login");
                    }).catch(function (err) {
                        console.log(err);
                        res.json(err);
                    });
                }
            })
        }
    })

    // Login Handle 
    app.post("/users/login", passport.authenticate("local"), function (req, res) {
        res.json("/members");
    });

    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

};