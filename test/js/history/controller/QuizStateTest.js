var QuizState = net.riemschneider.history.controller.QuizState;
var ViewState = net.riemschneider.structures.ViewState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('QuizStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'menu', true);
    this.topicSelection = {
      okCallback: null,
      backCallback: null,
      show: function () {},
      hide: function () {},
      onOk: function (callback) { this.okCallback = callback; },
      onBack: function (callback) { this.backCallback = callback; }
    };
  },

  testCreate: function () {
    var state = QuizState.create(this.stateMachine, this.topicSelection);
    assertTrue(TypeUtils.isOfType(state, QuizState));
    assertTrue(TypeUtils.isOfType(state, ViewState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testCanTransitionToMenuOnOk: function () {
    QuizState.create(this.stateMachine, this.topicSelection);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quiz');
    this.topicSelection.okCallback();
    assertEquals('menu', this.stateMachine.getCurrentStateId());
  },

  testCanTransitionToMenuOnBack: function () {
    QuizState.create(this.stateMachine, this.topicSelection);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quiz');
    this.topicSelection.backCallback();
    assertEquals('menu', this.stateMachine.getCurrentStateId());
  }
});