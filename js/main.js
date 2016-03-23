$(function() {

  $('.section').visibility({
    once: false,
    onPassing: function() {
      var route = $(this).data('route');
      Router.updateMenu(route);
    }
  });

  $('#sidebar a.item').click(function() {
    var route = $(this).attr('href').replace('\#', '');
    Router.goTo(route);
  });

  $('#cookies button').click(function() {
    $('#cookies').remove();
    localStorage.setItem('cookies', 'off');
  });

  if(localStorage.getItem('cookies') !== undefined && localStorage.getItem('cookies') === 'off') {
    $('#cookies').remove();
  }

  if($(window).height() < 500) {
    $('#sidebar .content').hide();
    $('#content').removeClass('twelve wide').addClass('sixteen wide');
  } else if($(window).height() < 600) {
    $('#sidebar').addClass('small');
  } else if($(window).height() < 660) {
    $('#sidebar').addClass('medium');
  }

  Router.init();

});


var Router = {

  init: function() {

    if(window.location.hash.length > 0) {
      var route = window.location.hash.replace('\#', '')
      Router.goTo(route);
    }

  },

  goTo: function(route) {

    if(route.length === 0) {
      return;
    }

    var section = $('.section[data-route="' + route + '"]');
    var top = section.offset().top + 20;
    var speed = 500;

    if(top > 1500) {
      speed = 200;
    }

    $('html, body').animate({
        scrollTop: top
    }, 500);

  },

  updateMenu: function(route) {

    if(route.length === 0) {
      return;
    }

    $('#sidebar .active').removeClass('active');
    $('#sidebar a.item[href="#' + route + '"]').addClass('active');
    $('#sidebar a.item[href="#' + route + '"]').parent().parent().addClass('active');
  }

}
