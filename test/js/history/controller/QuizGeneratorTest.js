var Difficulty = net.riemschneider.history.model.Difficulty;
var Opponent = net.riemschneider.history.model.Opponent;
var QuizGenerator = net.riemschneider.history.controller.QuizGenerator;
var TypeUtils = net.riemschneider.utils.TypeUtils;
var QuestionDistribution = net.riemschneider.history.model.QuestionDistribution;
var Region = net.riemschneider.history.model.Region;
var Regions = net.riemschneider.history.model.Regions;
var Question = net.riemschneider.history.model.Question;
var Answer = net.riemschneider.history.model.Answer;
var Random = net.riemschneider.utils.Random;

TestCase('QuizGeneratorTest', {
  setUp: function () {
    var pos = Position.create(1, 2);
    var regions = Regions.create([
      Region.create('REG1', 'img', pos, pos, pos),
      Region.create('REG2', 'img', pos, pos, pos),
      Region.create('REG3', 'img', pos, pos, pos),
      Region.create('REG4', 'img', pos, pos, pos)
    ]);

    var regionsByTopic = { topicId: regions };

    var questionDistribution = QuestionDistribution.create([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    var questionListGenerator = {
      generate: function generate(topicId, regions, distribution) {
        assertEquals('topicId', topicId);
        assertSame(regionsByTopic.topicId, regions);
        assertSame(questionDistribution.getDistribution(Difficulty.MEDIUM), distribution);
        return [
          Question.create('Q1', Difficulty.EASY, 'question?', Answer.create(0)),
          Question.create('Q2', Difficulty.MEDIUM, 'question?', Answer.create(0)),
          Question.create('Q3', Difficulty.MEDIUM, 'question?', Answer.create(0)),
          Question.create('Q4', Difficulty.HARD, 'question?', Answer.create(0))
        ];
      }
    };

    this.quizGenerator = QuizGenerator.create(regionsByTopic, questionListGenerator, questionDistribution);

    Random.setNext([0.8, 0.1, 0.5, 0.99]);

    this.pairing = {
      first: Opponent.create('OPP4', 'Sebastian Weier', 4, Difficulty.MEDIUM, [ 0.95, 0.9, 0.8 ], []),
      second: Opponent.create('OPP5', 'Tom Stark', 5, Difficulty.EASY, [ 0.8, 0.7, 0.3 ], [])
    };
  },

  testGenerate: function () {
    this.quizGenerator.setCurrentTopic('topicId');
    this.quizGenerator.setCurrentDifficulty(Difficulty.MEDIUM);
    this.quizGenerator.setCurrentOpponents(this.pairing);
    var quiz = this.quizGenerator.generate();
    assertNotNull(quiz);
    assertTrue(TypeUtils.isOfType(quiz, net.riemschneider.history.model.Quiz));
    assertEquals('topicId', quiz.getTopicId());
    assertSame(Difficulty.MEDIUM, quiz.getDifficulty());
    assertSame(this.pairing, quiz.getOpponentPairing());
    var questionsByRegion = quiz.getQuestionsByRegion();
    assertEquals('Q4', questionsByRegion.REG1.getId());
    assertEquals('Q1', questionsByRegion.REG2.getId());
    assertEquals('Q3', questionsByRegion.REG3.getId());
    assertEquals('Q2', questionsByRegion.REG4.getId());
  },

  testSettersNullAndTypeSafe: function () {
    var quizGenerator = this.quizGenerator;
    assertException(function () { quizGenerator.setCurrentTopic(null); }, 'TypeError');
    assertException(function () { quizGenerator.setCurrentTopic(90); }, 'TypeError');
    assertException(function () { quizGenerator.setCurrentTopic('other'); }, 'TypeError');

    assertException(function () { quizGenerator.setCurrentDifficulty(null); }, 'TypeError');
    assertException(function () { quizGenerator.setCurrentDifficulty('easy'); }, 'TypeError');

    assertException(function () { quizGenerator.setCurrentOpponents({ first: this.pairing.first }); }, 'TypeError');
    assertException(function () { quizGenerator.setCurrentOpponents({ second: this.pairing.second }); }, 'TypeError');
    assertException(function () { quizGenerator.setCurrentOpponents({ first: this.pairing.first, second: {} }); }, 'TypeError');
    assertException(function () { quizGenerator.setCurrentOpponents({ first: {}, second: this.pairing.second }); }, 'TypeError');
  },

  testGenerateWithoutCallingSetCurrentTopic: function () {
    var quizGenerator = this.quizGenerator;
    quizGenerator.setCurrentDifficulty(Difficulty.MEDIUM);
    quizGenerator.setCurrentOpponents(this.pairing);
    assertException(function () { quizGenerator.generate(); }, 'TypeError');
  },

  testGenerateWithoutCallingSetCurrentDifficulty: function () {
    var quizGenerator = this.quizGenerator;
    quizGenerator.setCurrentTopic('topicId');
    quizGenerator.setCurrentOpponents(this.pairing);
    assertException(function () { quizGenerator.generate(); }, 'TypeError');
  },

  testGenerateWithoutCallingSetCurrentOpponents: function () {
    var quizGenerator = this.quizGenerator;
    quizGenerator.setCurrentDifficulty(Difficulty.MEDIUM);
    quizGenerator.setCurrentTopic('topicId');
    assertException(function () { quizGenerator.generate(); }, 'TypeError');
  }
});
