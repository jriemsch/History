var QuizOpponentState = net.riemschneider.history.controller.QuizOpponentState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('QuizOpponentStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'menu', true);
    State.create(this.stateMachine, 'quizTopic', false);
    State.create(this.stateMachine, 'quiz', false);
    this.presenter = {
      onDone: null,
      onBack: null,
      show: function show(onBack, onDone) { this.onBack = onBack; this.onDone = onDone; },
      hide: function hide() { this.onBack = null; this.onDone = null; }
    };
  },

  testCreate: function () {
    var state = QuizOpponentState.create(this.stateMachine, this.presenter);
    assertTrue(TypeUtils.isOfType(state, QuizOpponentState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { QuizOpponentState.create(this.stateMachine, null); }, 'TypeError');
  },

  testOnEnter: function () {
    QuizOpponentState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizOpponent');

    assertNotNull(this.presenter.onDone);
  },

  testOnDoneCallback: function () {
    QuizOpponentState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizOpponent');

    this.presenter.onDone();

    assertEquals('quiz', this.stateMachine.getCurrentStateId());
  },

  testOnBackCallback: function () {
    QuizOpponentState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizOpponent');

    this.presenter.onBack();

    assertEquals('quizTopic', this.stateMachine.getCurrentStateId());
  },

  testOnLeave: function () {
    QuizOpponentState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizOpponent');

    this.stateMachine.transitionTo('menu');
    assertNull(this.presenter.onDone);
    assertNull(this.presenter.onBack);
  }
});