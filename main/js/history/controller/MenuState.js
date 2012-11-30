net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var State = net.riemschneider.structures.State;

  net.riemschneider.history.controller.MenuState = {
    create: function create(stateMachine, presenter) {
      ArgumentUtils.assertNotNull(presenter);

      var state = State.create(stateMachine, 'menu', true);

      state.onEnter = function onEnter() {
        presenter.show(
            function () { stateMachine.transitionTo('avatar'); },
            function () { stateMachine.transitionTo('quizTopic'); },
            function () { stateMachine.transitionTo('learn'); },
            function () { stateMachine.transitionTo('stats'); }
        );
      };

      state.onLeave = function onLeave() {
        presenter.hide();
      };

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.MenuState', net.riemschneider.history.controller.MenuState);
}());
