var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");
var bcrypt = require("bcryptjs");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, function (email, password, done) {
            // Make sure the email is in the db
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (!user) {
                    return done(null, false, { message: "This email is not registered" });
                }

                // Compare the passwords
                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Password does not match." })
                    }
                })
            })
                .catch(function (err) {
                    console.log(err);
                });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

}