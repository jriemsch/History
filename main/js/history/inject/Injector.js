net.riemschneider.history.inject = net.riemschneider.history.inject || {};

// Simple dependency injector mechanism to wire up the entire app.
(function () {
  net.riemschneider.history.inject.Injector = {
    create: function () {
      var injector = {};

      injector.playerController = net.riemschneider.history.controller.PlayerController.create();
      injector.avatarSelection = net.riemschneider.history.views.AvatarSelection.create(injector.playerController);

      return injector;
    }
  };
}());
