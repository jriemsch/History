var QuizController = net.riemschneider.history.controller.QuizController;
var Quiz = net.riemschneider.history.model.Quiz;
var Opponent = net.riemschneider.history.model.Opponent;
var Question = net.riemschneider.history.model.Question;
var Difficulty = net.riemschneider.history.model.Difficulty;
var Answer = net.riemschneider.history.model.Answer;

TestCase('QuizControllerTest', {
  setUp: function () {
    this.imageInfos = {
      first: Opponent.create('OPP0', 'Hans Schenk', 0, Difficulty.EASY, [ 0.9, 0.8, 0.5 ], []),
      second: Opponent.create('OPP2', 'Martin Salm', 2, Difficulty.EASY, [ 0.8, 0.5, 0.2 ], [])
    };

    this.questionsByRegion = {
      REG1: Question.create('Q1', Difficulty.EASY, 'question?', Answer.create(0)),
      REG2: Question.create('Q2', Difficulty.EASY, 'question?', Answer.create(0))
    };
  },

  testCreate: function () {
    var quizController = QuizController.create();
    assertNotNull(quizController);
  },

  testSetAndGetCurrentQuiz: function () {
    var quizController = QuizController.create();
    var quiz = Quiz.create('topicId', this.imageInfos, Difficulty.EASY, this.questionsByRegion);
    quizController.setCurrentQuiz(quiz);
    assertSame(quiz, quizController.getCurrentQuiz());
  },

  testSetCurrentQuizNullAndTypeSafe: function () {
    var quizController = QuizController.create();
    assertException(function () { quizController.setCurrentQuiz(null); }, 'TypeError');

    assertException(function () { quizController.setCurrentQuiz({}); }, 'TypeError');
  }
});