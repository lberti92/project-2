//allows parallax image on index page
$(document).ready(function () {
    $('.parallax').parallax();
});

// Register submit button
$("#register-submit").on("click", function (event) {
    event.preventDefault();

    var newUser = {
        name: $("#name").val().trim(),
        email: $("#email").val().trim(),
        password: $("#password").val().trim(),
        password2: $("#password2").val().trim()
    }

    $.post("/users/register", newUser).then(function (response) {
        console.log("added user");
        // location.href = "/dashboard";
    })
});

//captures data value for type on types page
$(".collection-item").on('click', function() {
    var typeSelection = $(this).attr("data-type");      
    console.log(typeSelection);   
});