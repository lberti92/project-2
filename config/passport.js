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
                    return done(null, false, { message: "This email is not registered." });
                }
                // Compare the passwords
                else if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: "Incorrect password."
                    });
                }

                return done(null, user);
            })
                .catch(function (err) {
                    console.log(err);
                });
        })
    );

    // Serializing the user session while logged in
    passport.serializeUser(function(user, cb) {
        cb(null, user);
      });
      //
      passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
      });

}