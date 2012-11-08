var QuizQuestionState = net.riemschneider.history.controller.QuizQuestionState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;
var Position = net.riemschneider.graphics.Position;
var QuizController = net.riemschneider.history.controller.QuizController;
var Region = net.riemschneider.history.model.Region;
var Regions = net.riemschneider.history.model.Regions;
var Quiz = net.riemschneider.history.model.Quiz;
var Opponent = net.riemschneider.history.model.Opponent;
var Difficulty = net.riemschneider.history.model.Difficulty;
var Question = net.riemschneider.history.model.Question;
var Answer = net.riemschneider.history.model.Answer;

TestCase('QuizQuestionStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'menu', true);
    this.quizView = {
      question: null,
      showQuestion: function showQuestion(question) { this.question = question; }
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
      topicId: Regions.create([ Region.create('R1', 'R1src', pos, pos, pos),  Region.create('R2', 'R2src', pos, pos, pos)  ])
    };
    this.quiz = Quiz.create('topicId', pairing, Difficulty.EASY, questionsByRegion);
    this.quizController.setCurrentQuiz(this.quiz);
  },

  testCreate: function () {
    var state = QuizQuestionState.create(this.stateMachine, this.quizController, this.quizView);
    assertTrue(TypeUtils.isOfType(state, QuizQuestionState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testTransition: function () {
    QuizQuestionState.create(this.stateMachine, this.quizController, this.quizView);
    this.stateMachine.start();
    this.quiz.setSelectedRegionId('R2');
    this.stateMachine.transitionTo('quizQuestion');
    assertEquals('Q2', this.quizView.question.getId());
  }
});
