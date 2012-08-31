net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var Option = net.riemschneider.history.views.Menu.Option;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ViewState = net.riemschneider.structures.ViewState;

  net.riemschneider.history.controller.MenuState = {
    create: function create(stateMachine, menu) {
      var state = ViewState.create(stateMachine, 'menu', true, menu);

      state.onConfigureView = function onConfigureView() {
        menu.onSelect(Option.AVATAR, function () { stateMachine.transitionTo('avatar'); });
        menu.onSelect(Option.QUIZ, function () { stateMachine.transitionTo('quizTopic'); });
      };

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.MenuState', net.riemschneider.history.controller.MenuState);
}());
