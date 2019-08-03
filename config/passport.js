var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");


module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: "email"}, function(email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      console.log("checking login")
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
      console.log("logging in!")
      return done(null, dbUser);
      
    });
  }
));


  passport.serializeUser(function (user, done) {
    console.log("serialized")
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    db.User.findByPk(id).then(function (user) {
      if (user) {
        console.log("deserialized")
        done(null, user.get());
      }
      else {
        done(user.errors, null);
      }
    });
  });
}