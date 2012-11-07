var Difficulty = net.riemschneider.history.model.Difficulty;
var Opponent = net.riemschneider.history.model.Opponent;
var Quiz = net.riemschneider.history.model.Quiz;
var Question = net.riemschneider.history.model.Question;
var Answer = net.riemschneider.history.model.Answer;
var Region = net.riemschneider.history.model.Region;
var Position = net.riemschneider.graphics.Position;

TestCase('QuizTest', {
  setUp: function () {
    this.pairing = {
      first: Opponent.create('OPP0', 'Hans Schenk', 0, Difficulty.EASY, [ 0.9, 0.8, 0.5 ], []),
      second: Opponent.create('OPP2', 'Martin Salm', 2, Difficulty.EASY, [ 0.8, 0.5, 0.2 ], [])
    };

    this.questionsByRegion = {
      REG1: Question.create('Q1', Difficulty.EASY, 'question?', Answer.create(0)),
      REG2: Question.create('Q2', Difficulty.EASY, 'question?', Answer.create(0))
    };
  },

  testCreateAndGetters: function () {
    var quiz = Quiz.create('topicId', this.pairing, Difficulty.EASY, this.questionsByRegion);
    assertNotNull(quiz);
    assertEquals('topicId', quiz.getTopicId());
    assertSame(Difficulty.EASY, quiz.getDifficulty());
    assertSame(this.pairing, quiz.getOpponentPairing());
    assertSame(this.questionsByRegion, quiz.getQuestionsByRegion());
  },

  testNullAndTypeSafe: function () {
    var question = Question.create('Q1', Difficulty.EASY, 'question?', Answer.create(0));

    assertException(function () { Quiz.create('topicId', this.pairing, Difficulty.EASY, null); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', this.pairing, null, this.questionsByRegion); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', null, Difficulty.EASY, this.questionsByRegion); }, 'TypeError');
    assertException(function () { Quiz.create(null, this.pairing, Difficulty.EASY, this.questionsByRegion); }, 'TypeError');

    assertException(function () { Quiz.create('topicId', this.pairing, 1, []); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', this.pairing, 1, { 1: question}); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', this.pairing, 1, { REG1: {}}); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', this.pairing, 1, this.questionsByRegion); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', {}, Difficulty.EASY, this.questionsByRegion); }, 'TypeError');
    assertException(function () { Quiz.create(1, this.pairing, Difficulty.EASY, this.questionsByRegion); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', { first: this.pairing.first }, Difficulty.EASY, this.questionsByRegion); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', { second: this.pairing.second }, Difficulty.EASY, this.questionsByRegion); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', { first: this.pairing.first, second: {} }, Difficulty.EASY, this.questionsByRegion); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', { first: {}, second: this.pairing.second }, Difficulty.EASY, this.questionsByRegion); }, 'TypeError');
  },

  testSetAndGetSelectedRegionId: function () {
    var quiz = Quiz.create('topicId', this.pairing, Difficulty.EASY, this.questionsByRegion);
    quiz.setSelectedRegionId('REG1');
    assertEquals('REG1', quiz.getSelectedRegionId());
  },

  testSetSelectedRegionIdTriggersObserver: function () {
    var quiz = Quiz.create('topicId', this.pairing, Difficulty.EASY, this.questionsByRegion);
    var regionId = null;
    quiz.getSelectedRegionIdTopic().registerObserver(function (data) { regionId = data; });
    quiz.setSelectedRegionId('REG1');
    assertEquals('REG1', regionId);
  },

  testSetSelectedRegionIdNullAndTypeSafe: function () {
    var quiz = Quiz.create('topicId', this.pairing, Difficulty.EASY, this.questionsByRegion);

    assertException(function () { quiz.setSelectedRegionId(null); }, 'TypeError');

    assertException(function () { quiz.setSelectedRegionId({}); }, 'TypeError');
    assertException(function () { quiz.setSelectedRegionId('other'); }, 'TypeError');
  }
});
