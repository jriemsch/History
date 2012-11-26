net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var State = net.riemschneider.structures.State;

  net.riemschneider.history.controller.AvatarState = {
    create: function create(stateMachine, presenter) {
      ArgumentUtils.assertNotNull(presenter);

      var state = State.create(stateMachine, 'avatar', false);

      state.onEnter = function onEnter() {
        presenter.show(function () { stateMachine.transitionTo('menu'); });
      };

      state.onLeave = function onLeave() {
        presenter.hide();
      };

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.AvatarState', net.riemschneider.history.controller.AvatarState);
}());
