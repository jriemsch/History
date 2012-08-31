net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ViewState = net.riemschneider.structures.ViewState;

  net.riemschneider.history.controller.QuizOpponentState = {
    create: function create(stateMachine, opponentSelection) {
      var state = ViewState.create(stateMachine, 'quizOpponent', false, opponentSelection);

      state.onConfigureView = function onConfigureView() {
        opponentSelection.onBack(function () { stateMachine.transitionTo('quizTopic'); });
        opponentSelection.onOk(function () { stateMachine.transitionTo('menu'); });
      };

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.QuizOpponentState', net.riemschneider.history.controller.QuizOpponentState);
}());