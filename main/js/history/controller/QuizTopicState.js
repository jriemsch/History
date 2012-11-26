net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var State = net.riemschneider.structures.State;

  net.riemschneider.history.controller.QuizTopicState = {
    create: function create(stateMachine, presenter) {
      ArgumentUtils.assertNotNull(presenter);

      var state = State.create(stateMachine, 'quizTopic', false);

      state.onEnter = function onEnter() {
        presenter.show(
          function onBack() { stateMachine.transitionTo('menu'); },
          function onDone() { stateMachine.transitionTo('quizOpponent'); }
        );
      };

      state.onLeave = function onLeave() {
        presenter.hide();
      };

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.QuizTopicState', net.riemschneider.history.controller.QuizTopicState);
}());