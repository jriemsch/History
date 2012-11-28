net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var State = net.riemschneider.structures.State;

  net.riemschneider.history.controller.QuizOpponentState = {
    create: function create(stateMachine, presenter) {
      ArgumentUtils.assertNotNull(presenter);

      var state = State.create(stateMachine, 'quizOpponent', false);

      state.onEnter = function onEnter() {
        presenter.show(
            function onBack() { stateMachine.transitionTo('quizTopic'); },
            function onDone() { stateMachine.transitionTo('quiz'); }
        );
      };

      state.onLeave = function onLeave() {
        presenter.hide();
      };

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.QuizOpponentState', net.riemschneider.history.controller.QuizOpponentState);
}());