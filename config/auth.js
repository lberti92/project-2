// check to make sure that a user is logged in to see a page/complete a request
module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    // If the user isn't' logged in, redirect them to the login page
    return res.redirect("/users/login");
  };