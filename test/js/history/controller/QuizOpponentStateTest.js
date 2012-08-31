var QuizOpponentState = net.riemschneider.history.controller.QuizOpponentState;
var ViewState = net.riemschneider.structures.ViewState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('QuizOpponentStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'quizTopic', true);
    State.create(this.stateMachine, 'menu', false);
    this.opponentSelection = {
      okCallback: null,
      backCallback: null,
      show: function () {},
      hide: function () {},
      onOk: function (callback) { this.okCallback = callback; },
      onBack: function (callback) { this.backCallback = callback; }
    };
  },

  testCreate: function () {
    var state = QuizOpponentState.create(this.stateMachine, this.opponentSelection);
    assertTrue(TypeUtils.isOfType(state, QuizOpponentState));
    assertTrue(TypeUtils.isOfType(state, ViewState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testCanTransitionToMenuOnOk: function () {
    QuizOpponentState.create(this.stateMachine, this.opponentSelection);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizOpponent');
    this.opponentSelection.okCallback();
    assertEquals('menu', this.stateMachine.getCurrentStateId());
  },

  testCanTransitionToMenuOnBack: function () {
    QuizOpponentState.create(this.stateMachine, this.opponentSelection);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizOpponent');
    this.opponentSelection.backCallback();
    assertEquals('quizTopic', this.stateMachine.getCurrentStateId());
  }
});