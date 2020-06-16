$(document).ready(function(e){
  prevScrollpos = window.pageYOffset;
  var colorIndex = Math.floor((Math.random() * 10));
  var bgClasses = ['main-aquamarine', 'main-black', 'main-blueviolet', 'main-cadetblue', 'main-coral',
                  'main-currentColor', 'main-darkCyan', 'main-dimgray', 'main-darkslategray', 'main-lightblue']
  var selectedClass = bgClasses[colorIndex];
  $("main").addClass(selectedClass);
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
