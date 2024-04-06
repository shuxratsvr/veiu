let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
$(function() {
    var currentAjaxRequest = null;
    var searchForms = $('form[action="/search"]').css('position','relative').each(function() {
      var input = $(this).find('input[name="q"]');
      var offSet = input.position().top + input.innerHeight();
      $('<ul class="search-results home-two"></ul>').css( { 'position': 'absolute', 'left': '0px', 'top': offSet } ).appendTo($(this)).hide();    
      input.attr('autocomplete', 'off').bind('keyup change', function() {
        var term = $(this).val();
        var form = $(this).closest('form');
        var searchURL = '/search?type=product&q=' + term;
        var resultsList = form.find('.search-results');
        if (term.length > 3 && term != $(this).attr('data-old-term')) {
          $(this).attr('data-old-term', term);
          if (currentAjaxRequest != null) currentAjaxRequest.abort();
          currentAjaxRequest = $.getJSON(searchURL + '&view=json', function(data) {
            resultsList.empty();
            if(data.results_count == 0) {
              resultsList.hide();
            } else {
              $.each(data.results, function(index, item) {
                var link = $('<a></a>').attr('href', item.url);
                link.append('<span class="thumbnail"><img src="' + item.thumbnail + '" /></span>');
                link.append('<span class="title">' + item.title + '</span>');
                link.wrap('<li></li>');
                resultsList.append(link.parent());
              });
              if(data.results_count > 10) {
                resultsList.append('<li><span class="title"><a href="' + searchURL + '">See all results (' + data.results_count + ')</a></span></li>');
              }
              resultsList.fadeIn(100);
            }        
          });
        }
      });
    });
    $('body').bind('click', function(){
      $('.search-results').hide();
    });
  });
 