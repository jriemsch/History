var MenuState = net.riemschneider.history.controller.MenuState;
var ViewState = net.riemschneider.structures.ViewState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;
var Menu = net.riemschneider.history.views.Menu;

TestCase('MenuStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'avatar', false);
    State.create(this.stateMachine, 'quiz', false);
    this.menu = {
      callbacks: {},
      show: function () {},
      hide: function () {},
      onSelect: function (option, callback) { this.callbacks[option.key] = callback; }
    };
  },

  testCreate: function () {
    var state = MenuState.create(this.stateMachine, this.menu);
    assertTrue(TypeUtils.isOfType(state, MenuState));
    assertTrue(TypeUtils.isOfType(state, ViewState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testIsStartState: function () {
    MenuState.create(this.stateMachine, this.menu);
    this.stateMachine.start();
    assertEquals('menu', this.stateMachine.getCurrentStateId());
  },

  testCanTransitionToAvatar: function () {
    MenuState.create(this.stateMachine, this.menu);
    this.stateMachine.start();
    this.menu.callbacks[Menu.Option.AVATAR.key]();
    assertEquals('avatar', this.stateMachine.getCurrentStateId());
  },

  testCanTransitionToQuiz: function () {
    MenuState.create(this.stateMachine, this.menu);
    this.stateMachine.start();
    this.menu.callbacks[Menu.Option.QUIZ.key]();
    assertEquals('quiz', this.stateMachine.getCurrentStateId());
  }
});