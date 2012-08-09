net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ViewState = net.riemschneider.structures.ViewState;

  net.riemschneider.history.controller.QuizState = {
    create: function create(stateMachine, topicSelection) {
      var state = ViewState.create(stateMachine, 'quiz', topicSelection);

      state.onConfigureView = function onConfigureView() {
        topicSelection.onBack(function () { stateMachine.transitionTo('menu'); });
        topicSelection.onOk(function () { stateMachine.transitionTo('menu'); });
      };

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.QuizState', net.riemschneider.history.controller.QuizState);
}());