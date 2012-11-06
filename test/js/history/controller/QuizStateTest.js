var QuizState = net.riemschneider.history.controller.QuizState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('QuizStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'menu', true);
    State.create(this.stateMachine, 'quizPlayerSelectsRegion', false);
    this.quizView = {
      quiz: null,
      shown: false,
      show: function show() { this.shown = true; },
      hide: function hide() { this.shown = false; }
    };
  },

  testCreate: function () {
    var state = QuizState.create(this.stateMachine, this.quizView);
    assertTrue(TypeUtils.isOfType(state, QuizState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testTransition: function () {
    QuizState.create(this.stateMachine, this.quizView);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quiz');
    assertTrue(this.quizView.shown);
    assertEquals('quizPlayerSelectsRegion', this.stateMachine.getCurrentStateId());
  }
});
