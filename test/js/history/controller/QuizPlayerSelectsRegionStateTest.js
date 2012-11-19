var QuizPlayerSelectsRegionState = net.riemschneider.history.controller.QuizPlayerSelectsRegionState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;
var Position = net.riemschneider.graphics.Position;
var ImageData = net.riemschneider.graphics.ImageData;
var QuizController = net.riemschneider.history.controller.QuizController;
var Region = net.riemschneider.history.model.Region;
var Regions = net.riemschneider.history.model.Regions;
var Quiz = net.riemschneider.history.model.Quiz;
var Opponent = net.riemschneider.history.model.Opponent;
var Difficulty = net.riemschneider.history.model.Difficulty;
var Question = net.riemschneider.history.model.Question;
var Answer = net.riemschneider.history.model.Answer;

TestCase('QuizPlayerSelectsRegionStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'menu', true);
    State.create(this.stateMachine, 'quizQuestion', false);
    this.quizView = {
      onRegionSelectedCallback: null,
      onRegionSelected: function onRegionSelected(callback) { this.onRegionSelectedCallback = callback; }
    };
    this.quizController = QuizController.create();
    var pairing = {
      first: Opponent.create('OPP0', 'Hans Schenk', 0, Difficulty.EASY, [ 0.9, 0.8, 0.5 ], []),
      second: Opponent.create('OPP2', 'Martin Salm', 2, Difficulty.EASY, [ 0.8, 0.5, 0.2 ], [])
    };
    var questionsByRegion = {
      R1: Question.create('Q1', Difficulty.EASY, 'question?', Answer.create(0)),
      R2: Question.create('Q2', Difficulty.EASY, 'question?', Answer.create(0))
    };
    var pos = Position.create(0, 0);
    this.regionsByTopic = {
      topicId: Regions.create([
        Region.create('R1', ImageData.create('R1src', pos, pos), pos),
        Region.create('R2', ImageData.create('R2src', pos, pos), pos)
      ])
    };
    this.quiz = Quiz.create('topicId', pairing, Difficulty.EASY, questionsByRegion);
    this.quizController.setCurrentQuiz(this.quiz);
  },

  testCreate: function () {
    var state = QuizPlayerSelectsRegionState.create(this.stateMachine, this.quizController, this.quizView);
    assertTrue(TypeUtils.isOfType(state, QuizPlayerSelectsRegionState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testTransition: function () {
    QuizPlayerSelectsRegionState.create(this.stateMachine, this.quizController, this.quizView);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizPlayerSelectsRegion');
  },

  testRegionSelectCallbackIsSetIfAndOnlyIfStateIsActive: function () {
    QuizPlayerSelectsRegionState.create(this.stateMachine, this.quizController, this.quizView);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizPlayerSelectsRegion');
    assertNotNull(this.quizView.onRegionSelectedCallback);
    this.stateMachine.transitionTo('menu');
    assertNull(this.quizView.onRegionSelectedCallback);
  },

  testRegionSelect: function () {
    QuizPlayerSelectsRegionState.create(this.stateMachine, this.quizController, this.quizView);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quizPlayerSelectsRegion');
    this.quizView.onRegionSelectedCallback(this.regionsByTopic.topicId.getRegion('R1'));
    assertEquals('R1', this.quizController.getCurrentQuiz().getSelectedRegionId());
  }
});
