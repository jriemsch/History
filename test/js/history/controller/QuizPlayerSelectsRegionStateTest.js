var QuizPlayerSelectsRegionState = net.riemschneider.history.controller.QuizPlayerSelectsRegionState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('QuizPlayerSelectsRegionStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'menu', true);
    this.quizView = {
      quiz: null,
      onRegionSelectedCallback: null,
      onRegionSelected: function onRegionSelected(callback) { this.onRegionSelectedCallback = callback; }
    };
  },

  testCreate: function () {
    var state = QuizPlayerSelectsRegionState.create(this.stateMachine, this.quizView);
    assertTrue(TypeUtils.isOfType(state, QuizPlayerSelectsRegionState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testTransition: function () {
    QuizPlayerSelectsRegionState.create(this.stateMachine, this.quizView);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizPlayerSelectsRegion');
  },

  testRegionSelectCallbackIsSetIfAndOnlyIfStateIsActive: function () {
    QuizPlayerSelectsRegionState.create(this.stateMachine, this.quizView);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizPlayerSelectsRegion');
    assertNotNull(this.quizView.onRegionSelectedCallback);
    this.stateMachine.transitionTo('menu');
    assertNull(this.quizView.onRegionSelectedCallback);
  },

  testRegionSelect: function () {
    QuizPlayerSelectsRegionState.create(this.stateMachine, this.quizView);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizPlayerSelectsRegion');
    this.quizView.onRegionSelectedCallback();
  }
});
