var Difficulty = net.riemschneider.history.model.Difficulty;
var Opponent = net.riemschneider.history.model.Opponent;
var QuizController = net.riemschneider.history.controller.QuizController;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('QuizControllerTest', {
  setUp: function () {
    this.quizController = QuizController.create();
  },

  testCreateQuiz: function () {
    this.quizController.setCurrentTopic('topicId');
    this.quizController.setCurrentDifficulty(Difficulty.MEDIUM);
    var pairing = {
      first: Opponent.create('OPP4', 'Sebastian Weier', 4, Difficulty.MEDIUM, [ 0.95, 0.9, 0.8 ], []),
      second: Opponent.create('OPP5', 'Tom Stark', 5, Difficulty.EASY, [ 0.8, 0.7, 0.3 ], [])
    };
    this.quizController.setCurrentOpponents(pairing);
    var quiz = this.quizController.createQuiz();
    assertNotNull(quiz);
    assertTrue(TypeUtils.isOfType(quiz, net.riemschneider.history.model.Quiz));
    assertEquals('topicId', quiz.getTopicId());
    assertSame(Difficulty.MEDIUM, quiz.getDifficulty());
    assertSame(pairing, quiz.getOpponentPairing());
  }
});
