(function () {
  window.ondragstart = function() { return false; };

  $(document).bind("mobileinit", function() {
    $.mobile.touchOverflowEnabled = true;
  });

  document.addEventListener('deviceready', function () {}, false);

  $(document).ready(function () {
    function init(injector) {
      $('#startupButtons').remove();
      injector.menu.show();
    }

    $('#startButton').click(function () {
      var injector = net.riemschneider.history.inject.Injector.create();
      init(injector);
    });

    $('#resetButton').click(function () {
      net.riemschneider.history.controller.PlayerController.resetState();

      var injector = net.riemschneider.history.inject.Injector.create();
      init(injector);
    });
  });
})();
