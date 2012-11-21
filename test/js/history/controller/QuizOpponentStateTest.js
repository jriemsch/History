var QuizOpponentState = net.riemschneider.history.controller.QuizOpponentState;
var ViewState = net.riemschneider.structures.ViewState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;
var Difficulty = net.riemschneider.history.model.Difficulty;
var Opponent = net.riemschneider.history.model.Opponent;

TestCase('QuizOpponentStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'quizTopic', true);
    State.create(this.stateMachine, 'quiz', false);
    this.opponentSelection = {
      backCallback: null,
      opponentInfos: null,
      show: function () {},
      hide: function () {},
      onBack: function (callback) { this.backCallback = callback; },
      setOpponentInfos: function (infos) { this.opponentInfos = infos; }
    };

    var pairings = {};
    pairings[Difficulty.EASY.key] = [
      {
        first: Opponent.create('OPP0', 'Hans', 0, Difficulty.EASY, [ 0.9, 0.8, 0.5 ], []),
        second: Opponent.create('OPP1', 'Günther', 1, Difficulty.EASY, [ 0.95, 0.85, 0.7 ], [])
      },
      {
        first: Opponent.create('OPP2', 'Martin', 2, Difficulty.EASY, [ 0.8, 0.5, 0.2 ], []),
        second: Opponent.create('OPP3', 'Siegfried', 3, Difficulty.EASY, [ 0.8, 0.7, 0.5 ], [])
      }
    ];
    pairings[Difficulty.MEDIUM.key] = [
      {
        first: Opponent.create('OPP4', 'Sebastian', 4, Difficulty.MEDIUM, [ 0.95, 0.9, 0.8 ], []),
        second: Opponent.create('OPP5', 'Tom', 5, Difficulty.EASY, [ 0.8, 0.7, 0.3 ], [])
      }
    ];

    this.pairings = pairings;
    this.opponentController = {
      getRandomOpponentPairings: function getRandomOpponentPairings() {
        return pairings;
      }
    };

    var quiz = {};
    this.quiz = quiz;
    this.quizGenerator = {
      opponentPairing: null,
      difficulty: null,
      created: false,
      setCurrentOpponents: function setCurrentOpponents(pairing) { this.opponentPairing = pairing; },
      setCurrentDifficulty: function setCurrentDifficulty(difficulty) { this.difficulty = difficulty; },
      generate: function generate() { this.created = true; return quiz; }
    };

    this.quizController = {
      createdQuiz: null,
      setCurrentQuiz: function setCurrentQuiz(quiz) { this.createdQuiz = quiz; }
    };
  },

  testCreate: function () {
    var state = QuizOpponentState.create(this.stateMachine, this.opponentSelection, this.opponentController, this.quizGenerator, this.quizController);
    assertTrue(TypeUtils.isOfType(state, QuizOpponentState));
    assertTrue(TypeUtils.isOfType(state, ViewState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testCreateNullAndTypeSafe: function () {
    var stateMachine = this.stateMachine;
    var opponentSelection = this.opponentSelection;
    var opponentController = this.opponentController;
    var quizGenerator = this.quizGenerator;
    var quizController = this.quizController;

    assertException(function () { QuizOpponentState.create(stateMachine, opponentSelection, opponentController, quizGenerator, null ); }, 'TypeError');
    assertException(function () { QuizOpponentState.create(stateMachine, opponentSelection, opponentController, null, quizController ); }, 'TypeError');
    assertException(function () { QuizOpponentState.create(stateMachine, opponentSelection, null, quizGenerator, quizController ); }, 'TypeError');
    assertException(function () { QuizOpponentState.create(stateMachine, null, opponentController, quizGenerator, quizController ); }, 'TypeError');
    assertException(function () { QuizOpponentState.create(null, opponentSelection, opponentController, quizGenerator, quizController ); }, 'TypeError');

    assertException(function () { QuizOpponentState.create({}, opponentSelection, opponentController, quizGenerator, quizController ); }, 'TypeError');
  },

  testOpponentsSelection: function () {
    QuizOpponentState.create(this.stateMachine, this.opponentSelection, this.opponentController, this.quizGenerator, this.quizController);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizOpponent');
    this.opponentSelection.opponentInfos[1].callback();
    assertSame(this.pairings[Difficulty.EASY.key][1], this.quizGenerator.opponentPairing);
    assertSame(Difficulty.EASY, this.quizGenerator.difficulty);
    assertTrue(this.quizGenerator.created);
    assertSame(this.quiz, this.quizController.createdQuiz);
    assertEquals('quiz', this.stateMachine.getCurrentStateId());
  },

  testCanTransitionToQuizTopicStateOnBack: function () {
    QuizOpponentState.create(this.stateMachine, this.opponentSelection, this.opponentController, this.quizGenerator, this.quizController);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizOpponent');
    this.opponentSelection.backCallback();
    assertEquals('quizTopic', this.stateMachine.getCurrentStateId());
  },

  testSetsOpponentInfosOnEnter: function () {
    QuizOpponentState.create(this.stateMachine, this.opponentSelection, this.opponentController, this.quizGenerator, this.quizController);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizOpponent');
    assertEquals(3, this.opponentSelection.opponentInfos.length);

    assertEquals('imageSelectionBackgroundGlowGreen', this.opponentSelection.opponentInfos[0].background);
    assertEquals('images/avatars/avatar000.png', this.opponentSelection.opponentInfos[0].image0);
    assertEquals('Hans', this.opponentSelection.opponentInfos[0].name0);
    assertEquals('images/avatars/avatar001.png', this.opponentSelection.opponentInfos[0].image1);
    assertEquals('Günther', this.opponentSelection.opponentInfos[0].name1);

    assertEquals('imageSelectionBackgroundGlowGreen', this.opponentSelection.opponentInfos[1].background);
    assertEquals('images/avatars/avatar002.png', this.opponentSelection.opponentInfos[1].image0);
    assertEquals('Martin', this.opponentSelection.opponentInfos[1].name0);
    assertEquals('images/avatars/avatar003.png', this.opponentSelection.opponentInfos[1].image1);
    assertEquals('Siegfried', this.opponentSelection.opponentInfos[1].name1);

    assertEquals('imageSelectionBackgroundGlowYellow', this.opponentSelection.opponentInfos[2].background);
    assertEquals('images/avatars/avatar004.png', this.opponentSelection.opponentInfos[2].image0);
    assertEquals('Sebastian', this.opponentSelection.opponentInfos[2].name0);
    assertEquals('images/avatars/avatar005.png', this.opponentSelection.opponentInfos[2].image1);
    assertEquals('Tom', this.opponentSelection.opponentInfos[2].name1);
  }
});