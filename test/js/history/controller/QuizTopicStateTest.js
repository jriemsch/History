var QuizTopicState = net.riemschneider.history.controller.QuizTopicState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('QuizTopicStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'menu', true);
    State.create(this.stateMachine, 'quizOpponent', false);
    this.presenter = {
      onDone: null,
      onBack: null,
      show: function show(onBack, onDone) { this.onBack = onBack; this.onDone = onDone; },
      hide: function hide() { this.onBack = null; this.onDone = null; }
    };
  },

  testCreate: function () {
    var state = QuizTopicState.create(this.stateMachine, this.presenter);
    assertTrue(TypeUtils.isOfType(state, QuizTopicState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { QuizTopicState.create(this.stateMachine, null); }, 'TypeError');
  },

  testOnEnter: function () {
    QuizTopicState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizTopic');

    assertNotNull(this.presenter.onDone);
  },

  testOnDoneCallback: function () {
    QuizTopicState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizTopic');

    this.presenter.onDone();

    assertEquals('quizOpponent', this.stateMachine.getCurrentStateId());
  },

  testOnBackCallback: function () {
    QuizTopicState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizTopic');

    this.presenter.onBack();

    assertEquals('menu', this.stateMachine.getCurrentStateId());
  },

  testOnLeave: function () {
    QuizTopicState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizTopic');

    this.stateMachine.transitionTo('menu');
    assertNull(this.presenter.onDone);
    assertNull(this.presenter.onBack);
  }
});