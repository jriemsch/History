net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ViewState = net.riemschneider.structures.ViewState;

  net.riemschneider.history.controller.AvatarState = {
    create: function create(stateMachine, avatarSelection, playerController) {
      var state = ViewState.create(stateMachine, 'avatar', avatarSelection);

      state.onConfigureView = function onConfigureView() {
        avatarSelection.onOk(function () {
          savePlayer();
          stateMachine.transitionTo('menu');
        });
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
