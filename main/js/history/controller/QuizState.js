net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var State = net.riemschneider.structures.State;

  net.riemschneider.history.controller.QuizState = {
    create: function create(stateMachine, quizView) {
      ArgumentUtils.assertNotNull(quizView);
      ArgumentUtils.assertFunction(quizView.show);

      var state = State.create(stateMachine, 'quiz', false);
      state.onEnter = function onEnter() {
        quizView.show();
        stateMachine.transitionTo('quizPlayerSelectsRegion');
      };
      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.QuizState', net.riemschneider.history.controller.QuizState);
}());
