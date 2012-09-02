var Difficulty = net.riemschneider.history.model.Difficulty;
var Opponent = net.riemschneider.history.model.Opponent;
var Quiz = net.riemschneider.history.model.Quiz;

TestCase('QuizTest', {
  setUp: function () {
    this.pairing = {
      first: Opponent.create('OPP0', 'Hans Schenk', 0, Difficulty.EASY, [ 0.9, 0.8, 0.5 ], []),
      second: Opponent.create('OPP2', 'Martin Salm', 2, Difficulty.EASY, [ 0.8, 0.5, 0.2 ], [])
    };
  },

  testCreateAndGetters: function () {
    var quiz = Quiz.create('topicId', this.pairing, Difficulty.EASY);
    assertNotNull(quiz);
    assertEquals('topicId', quiz.getTopicId());
    assertSame(Difficulty.EASY, quiz.getDifficulty());
    assertSame(this.pairing, quiz.getOpponentPairing());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { Quiz.create('topicId', this.pairing, null); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', null, Difficulty.EASY); }, 'TypeError');
    assertException(function () { Quiz.create(null, this.pairing, Difficulty.EASY); }, 'TypeError');

    assertException(function () { Quiz.create('topicId', this.pairing, 1); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', {}, Difficulty.EASY); }, 'TypeError');
    assertException(function () { Quiz.create(1, this.pairing, Difficulty.EASY); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', { first: this.pairing.first }, Difficulty.EASY); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', { second: this.pairing.second }, Difficulty.EASY); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', { first: this.pairing.first, second: {} }, Difficulty.EASY); }, 'TypeError');
    assertException(function () { Quiz.create('topicId', { first: {}, second: this.pairing.second }, Difficulty.EASY); }, 'TypeError');
  }
});
