net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ViewState = net.riemschneider.structures.ViewState;

  net.riemschneider.history.controller.QuizTopicState = {
    create: function create(stateMachine, topicSelection, quizController) {
      var state = ViewState.create(stateMachine, 'quizTopic', false, topicSelection);

      state.onConfigureView = function onConfigureView() {
        topicSelection.onBack(function () { stateMachine.transitionTo('menu'); });
        topicSelection.onTopicSelected(function (topicId) {
          quizController.setCurrentTopic(topicId);
          stateMachine.transitionTo('quizOpponent');
        });
      };

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.QuizTopicState', net.riemschneider.history.controller.QuizTopicState);
}());