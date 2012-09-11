net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ViewState = net.riemschneider.structures.ViewState;

  net.riemschneider.history.controller.QuizState = {
    create: function create(stateMachine, quizView, quizController) {
      var state = ViewState.create(stateMachine, 'quiz', false, quizView);

      state.onConfigureView = function onConfigureView() {
        quizView.setQuiz(quizController.getCurrentQuiz());
      };

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.QuizState', net.riemschneider.history.controller.QuizState);
}());