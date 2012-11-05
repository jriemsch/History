var QuizState = net.riemschneider.history.controller.QuizState;
var ViewState = net.riemschneider.structures.ViewState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('QuizStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'menu', true);
    this.quizView = {
      quiz: null,
      show: function show() {},
      hide: function hide() {}
    };
  },

  testCreate: function () {
    var state = QuizState.create(this.stateMachine, this.quizView);
    assertTrue(TypeUtils.isOfType(state, QuizState));
    assertTrue(TypeUtils.isOfType(state, ViewState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testTransition: function () {
    QuizState.create(this.stateMachine, this.quizView);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quiz');
  }
});