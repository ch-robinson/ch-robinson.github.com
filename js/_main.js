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

  var jsMenuInit = function() {
    // Off Canvas Sliding
    // Menu button click
    var jsMenuTrigger = document.getElementById('js-menu-trigger');
    var jsMenuScreen = document.getElementById('js-menu-screen');
    var jsMenu = document.getElementById('js-menu');

    var handler = function(e) {
      jsMenu.classList.toggle('is-visible');
      jsMenuScreen.classList.toggle('is-visible');
      jsMenuTrigger.classList.toggle('slide');
      jsMenuTrigger.classList.toggle('close');
      e.preventDefault();
    };

    addHandler(jsMenuTrigger, ['click', 'touchstart'], handler);
    addHandler(jsMenuScreen, ['click', 'touchstart'], handler);
  };

  document.addEventListener('DOMContentLoaded', function() {
    jsMenuInit();

    fluidvids.init({
      selector: ['iframe', 'object'],
      players: ['www.youtube.com', 'player.vimeo.com']
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
