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
      topicSelectionCallback: null,
      backCallback: null,
      show: function () {},
      hide: function () {},
      onTopicSelected: function (callback) { this.topicSelectionCallback = callback; },
      onBack: function (callback) { this.backCallback = callback; }
    };

    this.quizGenerator = {
      topicId: null,
      setCurrentTopic: function setCurrentTopic(topicId) { this.topicId = topicId; }
    };
  },

  testCreate: function () {
    var state = QuizTopicState.create(this.stateMachine, this.topicSelection, this.quizGenerator);
    assertTrue(TypeUtils.isOfType(state, QuizTopicState));
    assertTrue(TypeUtils.isOfType(state, ViewState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testCanTransitionToMenuOnTopicSelection: function () {
    QuizTopicState.create(this.stateMachine, this.topicSelection, this.quizGenerator);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizTopic');
    this.topicSelection.topicSelectionCallback('topicId');
    assertEquals('quizOpponent', this.stateMachine.getCurrentStateId());
  },

  testSetsTopicOnTopicSelection: function () {
    QuizTopicState.create(this.stateMachine, this.topicSelection, this.quizGenerator);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizTopic');
    this.topicSelection.topicSelectionCallback('topicId');
    assertEquals('topicId', this.quizGenerator.topicId);
  },

  testCanTransitionToMenuOnBack: function () {
    QuizTopicState.create(this.stateMachine, this.topicSelection, this.quizGenerator);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizTopic');
    this.topicSelection.backCallback();
    assertEquals('menu', this.stateMachine.getCurrentStateId());
  }
});