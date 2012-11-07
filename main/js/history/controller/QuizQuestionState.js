net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var State = net.riemschneider.structures.State;

  net.riemschneider.history.controller.QuizQuestionState = {
    create: function create(stateMachine, quizView) {
      ArgumentUtils.assertNotNull(quizView);

      var state = State.create(stateMachine, 'quizQuestion', false);
      state.onEnter = function onEnter() {
      };
      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.QuizQuestionState', net.riemschneider.history.controller.QuizQuestionState);
}());
