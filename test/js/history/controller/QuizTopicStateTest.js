var QuizTopicState = net.riemschneider.history.controller.QuizTopicState;
var ViewState = net.riemschneider.structures.ViewState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;
var Topic = net.riemschneider.history.model.Topic;
var AddOns = net.riemschneider.history.model.AddOns;
var Position = net.riemschneider.graphics.Position;
var ImageData = net.riemschneider.graphics.ImageData;

TestCase('QuizTopicStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'menu', true);
    State.create(this.stateMachine, 'quizOpponent', false);
    this.topicSelection = {
      topicInfos: null,
      backCallback: null,
      show: function () {},
      hide: function () {},
      setTopicInfos: function (topicInfos) { this.topicInfos = topicInfos; },
      onBack: function (callback) { this.backCallback = callback; }
    };

    this.quizGenerator = {
      topicId: null,
      setCurrentTopic: function setCurrentTopic(topicId) { this.topicId = topicId; }
    };

    var mapImgData = ImageData.create('/test/images/test.png', Position.ZERO, Position.create(1, 1));
    this.topicsById = {
      topic1: Topic.create('topic1', 'Topic1', '/test/images/test.png', mapImgData, 1901),
      topic2: Topic.create('topic2', 'Topic2', '/test/images/test.png', mapImgData, 1900)
    };

    this.addOns = AddOns.create();
  },

  testCreate: function () {
    var state = QuizTopicState.create(this.stateMachine, this.topicSelection, this.quizGenerator, this.topicsById, this.addOns);
    assertTrue(TypeUtils.isOfType(state, QuizTopicState));
    assertTrue(TypeUtils.isOfType(state, ViewState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { QuizTopicState.create(this.stateMachine, this.topicSelection, this.quizGenerator, this.topicsById, null); }, 'TypeError');
    assertException(function () { QuizTopicState.create(this.stateMachine, this.topicSelection, this.quizGenerator, null, this.addOns); }, 'TypeError');
    assertException(function () { QuizTopicState.create(this.stateMachine, this.topicSelection, null, this.topicsById, this.addOns); }, 'TypeError');
    assertException(function () { QuizTopicState.create(null, null, this.quizGenerator, this.topicsById, this.addOns); }, 'TypeError');

    assertException(function () { QuizTopicState.create(this.stateMachine, this.topicSelection, this.quizGenerator, this.topicsById, {}); }, 'TypeError');
    assertException(function () { QuizTopicState.create(this.stateMachine, this.topicSelection, this.quizGenerator, { id: {} }, this.addOns); }, 'TypeError');
    assertException(function () { QuizTopicState.create(this.stateMachine, {}, this.quizGenerator, this.topicsById, this.addOns); }, 'TypeError');
    assertException(function () { QuizTopicState.create({}, this.topicSelection, this.quizGenerator, this.topicsById, this.addOns); }, 'TypeError');
  },

  testSortingWithoutUnlock: function () {
    QuizTopicState.create(this.stateMachine, this.topicSelection, this.quizGenerator, this.topicsById, this.addOns);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizTopic');
    assertEquals('Topic2', this.topicSelection.topicInfos[0].name);
    assertEquals('Topic1', this.topicSelection.topicInfos[1].name);
  },

  testSortingWithUnlock: function () {
    this.addOns.unlock('topic1');
    QuizTopicState.create(this.stateMachine, this.topicSelection, this.quizGenerator, this.topicsById, this.addOns);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizTopic');
    assertEquals('Topic1', this.topicSelection.topicInfos[0].name);
    assertEquals('Topic2', this.topicSelection.topicInfos[1].name);
  },

  testCanTransitionToOpponentSelectionOnTopicSelection: function () {
    QuizTopicState.create(this.stateMachine, this.topicSelection, this.quizGenerator, this.topicsById, this.addOns);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizTopic');
    this.topicSelection.topicInfos[0].callback();
    assertEquals('quizOpponent', this.stateMachine.getCurrentStateId());
  },

  testSetsTopicOnTopicSelection: function () {
    QuizTopicState.create(this.stateMachine, this.topicSelection, this.quizGenerator, this.topicsById, this.addOns);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizTopic');
    this.topicSelection.topicInfos[0].callback();
    assertEquals('topic2', this.quizGenerator.topicId);
  },

  testCanTransitionToMenuOnBack: function () {
    QuizTopicState.create(this.stateMachine, this.topicSelection, this.quizGenerator, this.topicsById, this.addOns);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizTopic');
    this.topicSelection.backCallback();
    assertEquals('menu', this.stateMachine.getCurrentStateId());
  }
});