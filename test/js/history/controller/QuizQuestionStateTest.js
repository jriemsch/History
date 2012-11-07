var QuizQuestionState = net.riemschneider.history.controller.QuizQuestionState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('QuizQuestionStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'menu', true);
    this.quizView = {
    };
  },

  testCreate: function () {
    var state = QuizQuestionState.create(this.stateMachine, this.quizView);
    assertTrue(TypeUtils.isOfType(state, QuizQuestionState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testTransition: function () {
    QuizQuestionState.create(this.stateMachine, this.quizView);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizQuestion');
  }
});
