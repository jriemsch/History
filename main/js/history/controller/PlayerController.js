net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var Player = net.riemschneider.history.model.Player;
  var Storage = net.riemschneider.storage.Storage;

  var storage = Storage.create('playerController');

  net.riemschneider.history.controller.PlayerController = {
    resetState: storage.remove,

    create: function () {
      var player = loadPlayer();

      return {
        getPlayer: function getPlayer() {
          return player;
        },

        savePlayer: function savePlayer() {
          storage.set(player.getState());
        }
      };

      function loadPlayer() {
        var player = Player.create('Name', 0);
        var state = storage.get();
        if (state) {
          player.setState(state);
        }
        return player;
      }
    }
  }
}());
