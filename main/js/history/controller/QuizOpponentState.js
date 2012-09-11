net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ViewState = net.riemschneider.structures.ViewState;

  net.riemschneider.history.controller.QuizOpponentState = {
    create: function create(stateMachine, opponentSelection, opponentController, quizGenerator, quizController) {
      var state = ViewState.create(stateMachine, 'quizOpponent', false, opponentSelection);

      state.onConfigureView = function onConfigureView() {
        opponentSelection.setOpponentPairings(opponentController.getRandomOpponentPairings(2));
        opponentSelection.onBack(function () { stateMachine.transitionTo('quizTopic'); });
        opponentSelection.onOpponentsSelected(function (pairing, difficulty) {
          quizGenerator.setCurrentOpponents(pairing);
          quizGenerator.setCurrentDifficulty(difficulty);
          var quiz = quizGenerator.generate();
          quizController.setCurrentQuiz(quiz);
          stateMachine.transitionTo('quiz');
        });
      };

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.QuizOpponentState', net.riemschneider.history.controller.QuizOpponentState);
}());