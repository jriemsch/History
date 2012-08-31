var QuizTopicState = net.riemschneider.history.controller.QuizTopicState;
var ViewState = net.riemschneider.structures.ViewState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('QuizTopicStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'menu', true);
    State.create(this.stateMachine, 'quizOpponent', false);
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
    var state = QuizTopicState.create(this.stateMachine, this.topicSelection);
    assertTrue(TypeUtils.isOfType(state, QuizTopicState));
    assertTrue(TypeUtils.isOfType(state, ViewState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testCanTransitionToMenuOnOk: function () {
    QuizTopicState.create(this.stateMachine, this.topicSelection);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizTopic');
    this.topicSelection.okCallback();
    assertEquals('quizOpponent', this.stateMachine.getCurrentStateId());
  },

  testCanTransitionToMenuOnBack: function () {
    QuizTopicState.create(this.stateMachine, this.topicSelection);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizTopic');
    this.topicSelection.backCallback();
    assertEquals('menu', this.stateMachine.getCurrentStateId());
  }
});