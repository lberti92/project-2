  // $('.parallax').parallax();
console.log("loaded");
// Register submit button
$("#register-submit").on("click", function (event) {
  event.preventDefault();

  var newUser = {
    name: $("#name").val().trim(),
    email: $("#email").val().trim(),
    password: $("#password").val().trim(),
    password2: $("#password2").val().trim()
  };

  $.post("/users/register", newUser).then(function (response) {
    location.href = "/users/login";
  });
})

$("#login").on("click", function (event) {
  event.preventDefault();

    var login = {
      email: $("#email").val().trim(),
      password: $("#password").val().trim()
    };

    console.log(login);
    $.post("/users/login", login).then(function(response) {
      location.href = "/users/dashboard";
    });
  })