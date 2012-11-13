net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ViewState = net.riemschneider.structures.ViewState;
  var PlayerController = net.riemschneider.history.controller.PlayerController;

  net.riemschneider.history.controller.AvatarState = {
    create: function create(stateMachine, avatarSelection, playerController) {
      ArgumentUtils.assertType(playerController, PlayerController);

      var state = ViewState.create(stateMachine, 'avatar', false, avatarSelection);

      state.onConfigureView = function onConfigureView() {
        avatarSelection.onOk(function () {
          savePlayer();
          stateMachine.transitionTo('menu');
        });

        var player = playerController.getPlayer();
        avatarSelection.setAvatarImageIdx(player.getAvatarImageIdx());
        avatarSelection.setName(player.getName());
      };

      function savePlayer() {
        var player = playerController.getPlayer();
        player.setAvatarImageIdx(avatarSelection.getAvatarImageIdx());
        player.setName(avatarSelection.getName() || 'Mr. X');
        playerController.savePlayer();
      }

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.AvatarState', net.riemschneider.history.controller.AvatarState);
}());
