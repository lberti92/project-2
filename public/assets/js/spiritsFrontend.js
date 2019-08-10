var map;


// document.addEventListener('DOMContentLoaded', function () {
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.slider');
  // var instances = M.Slider.init(elems, options);
});

$('.parallax').parallax();

$('.slider').slider();

//allows parallax image on index page
$(document).ready(function () {
  $('.parallax').parallax();
});

//captures data value for type on types page
$(".collection-item").on('click', function () {
  event.preventDefault();
  var typeSelection = $(this).attr("data-type");

  function getType() {
    var typeChoice;

    switch (typeSelection) {
      case "absinthe":
        return typeChoice = "Absinthe";
      case "bitters":
        return typeChoice = "Bitters-Schnapps";
      case "bourbon":
        return typeChoice = "Bourbon";
      case "brandy":
        return typeChoice = "Brandy";
      case "gin":
        return typeChoice = "Gin";
      case "cordial":
        return typeChoice = "Liqueurs-Cordials";
      case "moonshine":
        return typeChoice = "Moonshine";
      case "rum":
        return typeChoice = "Rum";
      case "tequila":
        return typeChoice = "Tequila";
      case "vodka":
        return typeChoice = "Vodka";
      case "whiskey":
        return typeChoice = "Whiskey";
      case "other":
        return typeChoice = "Other";
    }
  }
  window.location = `/types/${getType()}`;
});

//map logic for location page
document.addEventListener('DOMContentLoaded', function () {

  if (document.querySelectorAll("#map").length > 0) {
    {
      if (document.querySelector("html").lang)
        lang = document.querySelector("html").lang;
      else
        lang = "en";

      var js_file = document.createElement("script");
      js_file.type = "text/javascript";
      js_file.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDaePvaHI6g5YqGAG0NQzJifWDKjySEFO0&callback=initMap&language=" + lang;

      document.getElementsByTagName('head')[0].appendChild(js_file);
    }
  };
});

function initMap() {
  var center = { lat: 38.835220, lng: -104.819801 };
  var locations = [
    ['Denver', 39.739235, -104.990250],
    ['Colorado Springs', 38.835220, -104.819801],
    ['Monument', 39.091579, -104.868240],
    ['Littleton', 39.613319, -105.016647],
    ['Loveland', 40.394390, -105.070580],
    ['Green Mountain Falls', 38.935330, -105.016860],
    ['Idaho Springs', 39.742481, -105.513550],
    ['Breckenridge', 38.482140, -106.048691],
    ['Centennial', 39.580746, -104.877174],
    ['Fort Collins', 40.588970, -105.082458],
    ['Buena Vista', 38.841770, -106.132561],
    ['Thornton', 39.870350, -104.982460],
    ['Carbondale', 39.396970, -107.217530],
    ['Westminster', 39.863510, -105.041122],
    ['Ouray', 38.022751, -107.671501],
    ['Winter Park', 38.891060, -105.760719],
    ['Golden', 39.749668, -105.216019],
    ['Boulder', 40.016869, -105.279617],
    ['Englewood', 39.549441, -104.988907],
    ['Longmont', 40.165730, -105.101189],
    ['Durango', 37.275280, -107.880066],
    ['Estes Park', 40.376129, -105.523651],
    ['Lafayette', 39.994282, -105.090462],
    ['Palisade', 39.106129, -108.350983],
    ['Hugo', 39.134750, -103.471160],
    ['Santa Fe', 35.686974, -105.937798],
    ['Lyons', 40.224030, -105.269913],
    ['Steamboat Springs', 40.484978, -106.831718],
    ['Dotsero', 39.649500, -107.060630],
    ['Montrose', 38.478031, -107.876808],
    ['Greeley', 40.422550, -104.694443],
    ['Arvada', 39.801121, -105.081451],
    ['Windsor', 40.479961, -104.907677],
    ['Salida', 38.534718, -105.998901],
    ['Basalt', 39.368698, -107.036057],
    ['Vail', 39.640260, -106.370870]
  ];
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: center
  });
  var infowindow = new google.maps.InfoWindow({});
  var marker, count;
  var image = "/img/bottle.png";
  for (count = 0; count < locations.length; count++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[count][1], locations[count][2]),
      map: map,
      icon: image,
      title: locations[count][0]
    });
    google.maps.event.addListener(marker, 'click', (function (marker, count) {
      return function () {
        infowindow.setContent(locations[count][0]);
        //this is the click event to pull the city information
        infowindow.open(map, marker);

        console.log("marker " + marker.title);

        function getLocation() {
          var selectedLocation = marker.title;
          var locationsArray = locations[0];

          for (var i = 0; i < locationsArray.length; i++) {
            if (selectedLocation === locationsArray[i]) {
            }
            return selectedLocation;
          }
        }
        console.log(getLocation());
        $.get(`/api/location/${getLocation()}`, function (data) {
          console.log(`/api/location/${getLocation()}`);
          console.log("data from the backend", data);
          $("#display").empty();
          var distillaryName = $("<h4>").addClass("distillery").text(data[0].distillery);
          var favButton = $("<button>").addClass("btn btn-wave favorite-distillery distillery").attr("data-distid", data[0].distillery.id).text("Save As Favorite");
          var saveButton = $("<button>").addClass("btn btn-wave save-distillery distillery").attr("data-distid", data[0].distillery.id).text("Save For Later");
          var alcohol = data[0].Alcohol;
          var alcoholDiv = $("<div>");
          for (var i = 0; i < alcohol.length; i++) {
            
            var name = $("<p>").text(alcohol[i].name);
            alcoholDiv.append(name);
            console.log(alcohol[i].name);
          }
          $("#modal2").modal("open");
          $("#display").append(distillaryName, favButton, saveButton, alcoholDiv);
          console.log(data[0].distillery);
        })
      }
    })(marker, count));
  }
}


document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.slider');
  // var instances = M.Slider.init(elems, options);
});

$('.parallax').parallax();

$('.slider').slider();

//allows parallax image on index page
$(document).ready(function () {
  $('.parallax').parallax();
});


// Modal Click Event for Modals
$('.modal').modal();

$(".view-alcohol").on("click", function () {
  var distId = $(this).data("distid");
  $.get(`/api/distillery/${distId}`, function (alcohol) {
    $(`#${distId}`).empty();
    for (var i = 0; i < alcohol.length; i++) {
      var name = $("<p>").text(alcohol[i].name);
      var type = $("<p>").text(alcohol[i].alcoholType);
      var flavor = $("<p>").text(alcohol[i].flavor);
      // var addRating = $("<button>").attr("data-alcoholId", alcohol[i].id).addClass("rate").text("Rate");
      var alcoholDiv = $("<div>").append(name, type, flavor);

      $(`#${distId}`).append(alcoholDiv);
    }
  })
})

$(".remove-favorite").on('click', function () {
  var distId = $(this).data("distid");
  $.ajax({
    url: `/users/favorite/${distId}`,
    type: "DELETE"
  }).then(function (result) {
    location.reload();
  })
});

$(".remove-saved").on('click', function () {
  var distId = $(this).data("distid");
  $.ajax({
    url: `/users/save/${distId}`,
    type: "DELETE"
  }).then(function (result) {
    location.reload();
  })
});

$(".save-distillery").on("click", function () {
  var distId = $(this).data("distid");
  $.ajax({
    url: `/save/${distId}`,
    type: "POST"
  }).then(function (result) {
    console.log(result);
    location.reload();
  });
});

$(".favorite-distillery").on("click", function () {
  var distId = $(this).data("distid");
  $.ajax({
    url: `/favorite/${distId}`,
    type: "POST"
  }).then(function (result) {
    console.log(result);
    location.reload();
  });
});

$("body").on("click", ".rate", function() {
  var alcoholId = $(this).data("alcoholid");
  window.location = `/rate/${alcoholId}`;
})

$('select').formSelect();

