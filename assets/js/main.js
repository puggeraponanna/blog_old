$(document).ready(function(e){
  prevScrollpos = window.pageYOffset;
});

$(window).on('scroll', function(e){
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    $("footer").show();
  } else {
    $("footer").hide();
  }
  prevScrollpos = currentScrollPos;
});
