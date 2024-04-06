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
  });function myFunction(x) {
    if (x.matches) {
      document.body.style.backgroundColor = "yellow";
    } else {
     document.body.style.backgroundColor = "pink";
    }
  }
  
  var x = window.matchMedia("(max-width: 700px)")
  
  myFunction(x);
  
  x.addEventListener("change", function() {
    myFunction(x);
  });
  var currentTab = 0;
  showTab(currentTab); 
  
  function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
      document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
      document.getElementById("nextBtn").innerHTML = "Next";
    }
    fixStepIndicator(n)
  }
  
  function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
      document.getElementById("regForm").submit();
      return false;
    }
    showTab(currentTab);
  }
  
  function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    for (i = 0; i < y.length; i++) {
      if (y[i].value == "") {
        y[i].className += " invalid";
        valid = false;
      }
    }
    if (valid) {
      document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; 
  
  function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
  }}