var QuizOpponentState = net.riemschneider.history.controller.QuizOpponentState;
var ViewState = net.riemschneider.structures.ViewState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;
var Difficulty = net.riemschneider.history.model.Difficulty;

TestCase('QuizOpponentStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'quizTopic', true);
    State.create(this.stateMachine, 'menu', false);
    this.opponentSelection = {
      backCallback: null,
      opponentsSelectionCallback: null,
      opponentPairings: null,
      show: function () {},
      hide: function () {},
      onBack: function (callback) { this.backCallback = callback; },
      onOpponentsSelected: function (callback) { this.opponentSelectionCallback = callback; },
      setOpponentPairings: function (pairings) { this.opponentPairings = pairings; }
    };

    var pairings = {};
    this.pairings = pairings;
    this.opponentController = {
      getRandomOpponentPairings: function getRandomOpponentPairings() {
        return pairings;
      }
    };

    this.quizController = {
      opponentPairings: null,
      difficulty: null,
      created: false,
      setCurrentOpponents: function setCurrentOpponents(pairings) { this.opponentPairings = pairings; },
      setCurrentDifficulty: function setCurrentDifficulty(difficulty) { this.difficulty = difficulty; },
      createQuiz: function createQuiz() { this.created = true; return {}; }
    };
  },

  testCreate: function () {
    var state = QuizOpponentState.create(this.stateMachine, this.opponentSelection, this.opponentController, this.quizController);
    assertTrue(TypeUtils.isOfType(state, QuizOpponentState));
    assertTrue(TypeUtils.isOfType(state, ViewState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testCanTransitionToMenuOnOpponentsSelection: function () {
    QuizOpponentState.create(this.stateMachine, this.opponentSelection, this.opponentController, this.quizController);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizOpponent');
    this.opponentSelection.opponentSelectionCallback({}, Difficulty.EASY);
    assertEquals('menu', this.stateMachine.getCurrentStateId());
  },

  testCreatesQuizOnOpponentSelection: function () {
    QuizOpponentState.create(this.stateMachine, this.opponentSelection, this.opponentController, this.quizController);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizOpponent');
    var pairing = {};
    this.opponentSelection.opponentSelectionCallback(pairing, Difficulty.EASY);
    assertSame(pairing, this.quizController.opponentPairings);
    assertSame(Difficulty.EASY, this.quizController.difficulty);
    assertTrue(this.quizController.created);
  },

  testCanTransitionToMenuOnBack: function () {
    QuizOpponentState.create(this.stateMachine, this.opponentSelection, this.opponentController, this.quizController);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizOpponent');
    this.opponentSelection.backCallback();
    assertEquals('quizTopic', this.stateMachine.getCurrentStateId());
  },

  testSetsOpponentPairingsOnEnter: function () {
    QuizOpponentState.create(this.stateMachine, this.opponentSelection, this.opponentController, this.quizController);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizOpponent');
    assertSame(this.pairings, this.opponentSelection.opponentPairings);
  }
});