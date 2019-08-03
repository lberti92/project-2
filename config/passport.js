var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");
var passport = require("passport");

passport.use(new LocalStrategy({ usernameField: "email"}, function(email, password, done) {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function(dbUser) {
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // Checking if the password matches, based on the method in the User Model
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // Email and password pass!
        return done(null, dbUser);
      });
    }
  ));

  // In order to help keep authentication state across HTTP requests,
  // Sequelize needs to serialize and deserialize the user
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  //
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  module.exports = passport;