net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var AvatarSelection = net.riemschneider.history.views.AvatarSelection;

  net.riemschneider.history.controller.AvatarPresenter = {
    create: function create(playerController, viewTemplates) {
      ArgumentUtils.assertType(playerController, net.riemschneider.history.controller.PlayerController);
      ArgumentUtils.assertMap(viewTemplates, function (key, elem) { ArgumentUtils.assertType(elem, net.riemschneider.ui.Template); });

      var view = AvatarSelection.create($('body'), viewTemplates);

      return {
        show: function show(onDone) {
          view.onOk(function () {
            savePlayer();
            onDone();
          });

          var player = playerController.getPlayer();
          view.setAvatarImageIdx(player.getAvatarImageIdx());
          view.setName(player.getName());
          view.show();

          function savePlayer() {
            var player = playerController.getPlayer();
            player.setAvatarImageIdx(view.getAvatarImageIdx());
            player.setName(view.getName() || 'Mr. X');
            playerController.savePlayer();
          }
        },

        hide: function hide() {
          view.hide();
        }
      };
    }
  };
}());
