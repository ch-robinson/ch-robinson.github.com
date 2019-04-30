(function() {
  'use strict';
  var addHandler = function(el, events, handler) {
    if (!el) {
      return;
    }
    for (var i = 0; i < events.length; i += 1) {
      el.addEventListener(events[i], handler);
    }
  };

  var toggleTrueFalse = function(current) {
    if (current === 'true') {
      return 'false';
    }
    return 'true';
  };

  var navbarInit = function() {
    // Menu button click
    var navbarToggle = document.getElementById('navbar-toggle');
    var siteNavigation = document.getElementById('site-navigation');

    var handler = function(e) {
      // animate hamburger
      navbarToggle.classList.toggle('close');

      // animate collapsed menu
      siteNavigation.classList.toggle('show');

      // update aria-expanded attribute
      var ariaExpanded = navbarToggle.getAttribute('aria-expanded');
      navbarToggle.setAttribute('aria-expanded', toggleTrueFalse(ariaExpanded));
      e.preventDefault();
    };

    addHandler(navbarToggle, ['click', 'touchstart'], handler);
  };

  document.addEventListener('DOMContentLoaded', function() {
    navbarInit();

    fluidvids.init({
      selector: ['iframe', 'object'],
      players: ['www.youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com']
    });

    // Table of Contents title. Change text to localize
    var toc = document.getElementById('markdown-toc');
    if (toc) {
      var overview = document.createElement('li');
      overview.innerHTML = '<h6>{{ site.data.messages.locales[site.locale].overview }}</h6>';
      toc.insertBefore(overview, toc.firstChild);
    }
  });
})();
