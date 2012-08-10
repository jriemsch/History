net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var Player = net.riemschneider.history.model.Player;
  var Storage = net.riemschneider.storage.Storage;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  var storage = Storage.create('playerController');

  net.riemschneider.history.controller.PlayerController = {
    resetState: storage.remove,

    create: function create() {
      var player = loadPlayer();

      function loadPlayer() {
        var player = Player.create('Name', 0);
        var state = storage.get();
        if (state) {
          player.setState(state);
        }
        return player;
      }

      return {
        getPlayer: function getPlayer() {
          return player;
        },

        savePlayer: function savePlayer() {
          storage.set(player.getState());
        }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.PlayerController', net.riemschneider.history.controller.PlayerController);
}());
