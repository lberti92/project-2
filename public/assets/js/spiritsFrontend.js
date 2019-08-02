    // $('.parallax').parallax();
    console.log("connected");

    // Register submit button
    $("#register-submit").on("click", function(event) {
      event.preventDefault();
  
      var newUser = {
          name: $("#name").val().trim(),
          email: $("#email").val().trim(),
          password: $("#password").val().trim(),
          password2: $("#password2").val().trim()
      }
  
      $.post("/users/register", newUser).then(function(response) {
          console.log("added user");
          // location.href = "/dashboard";
      })
  })
