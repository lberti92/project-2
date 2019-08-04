document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.slider');
  var instances = M.Slider.init(elems, options);
});
  
  $('.parallax').parallax();

  $('.slider').slider();

//allows parallax image on index page
$(document).ready(function () {
    $('.parallax').parallax();
});

//captures data value for type on types page
$(".collection-item").on('click', function() {
    var typeSelection = $(this).attr("data-type");      
    console.log(typeSelection);   
});