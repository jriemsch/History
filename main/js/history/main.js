(function () {
  window.ondragstart = function() { return false; };

  $(document).bind("mobileinit", function() {
    $.mobile.touchOverflowEnabled = true;
  });

  document.addEventListener('deviceready', function () {}, false);

  $(document).ready(function () {
    var startButton = $('#startButton');
    var resetButton = $('#resetButton');

    startButton.show();
    resetButton.show();

    function init(injector) {
      $('#startupButtons').remove();
      injector.stateMachine.start();
    }

    startButton.click(function () {
      net.riemschneider.history.inject.Injector.create(init);
    });

    resetButton.click(function () {
      net.riemschneider.history.controller.PlayerController.resetState();

      net.riemschneider.history.inject.Injector.create(init);
    });
  });
})();
