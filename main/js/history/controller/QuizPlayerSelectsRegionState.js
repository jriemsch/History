net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var State = net.riemschneider.structures.State;

  net.riemschneider.history.controller.QuizPlayerSelectsRegionState = {
    create: function create(stateMachine, quizController, quizView) {
      ArgumentUtils.assertNotNull(quizController);
      ArgumentUtils.assertNotNull(quizView);
      ArgumentUtils.assertFunction(quizView.onRegionSelected);

      var state = State.create(stateMachine, 'quizPlayerSelectsRegion', false);
      state.onEnter = function onEnter() {
        quizView.onRegionSelected(onRegionSelected);
      };
      state.onLeave = function onLeave() {
        quizView.onRegionSelected(null);
      };

      function onRegionSelected(region) {
        quizController.getCurrentQuiz().setSelectedRegionId(region.getId());
        stateMachine.transitionTo('quizQuestion');
      }

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.QuizPlayerSelectsRegionState', net.riemschneider.history.controller.QuizPlayerSelectsRegionState);
}());
