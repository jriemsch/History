var QuestionDistribution = net.riemschneider.history.model.QuestionDistribution;
var Difficulty = net.riemschneider.history.model.Difficulty;

TestCase('QuestionDistributionTest', {
  testCreateAndGetters: function () {
    var questionDistribution = QuestionDistribution.create([
        [0.1, 0.2, 0.7], [0.2, 0.3, 0.5], [0.3, 0.4, 0.3]
    ]);
    var distribution = questionDistribution.getDistribution(Difficulty.EASY);
    assertEquals(0.1, distribution[Difficulty.EASY.key]);
    assertEquals(0.2, distribution[Difficulty.MEDIUM.key]);
    assertEquals(0.7, distribution[Difficulty.HARD.key]);

    distribution = questionDistribution.getDistribution(Difficulty.MEDIUM);
    assertEquals(0.2, distribution[Difficulty.EASY.key]);
    assertEquals(0.3, distribution[Difficulty.MEDIUM.key]);
    assertEquals(0.5, distribution[Difficulty.HARD.key]);

    distribution = questionDistribution.getDistribution(Difficulty.HARD);
    assertEquals(0.3, distribution[Difficulty.EASY.key]);
    assertEquals(0.4, distribution[Difficulty.MEDIUM.key]);
    assertEquals(0.3, distribution[Difficulty.HARD.key]);
  },

  testNullAndTypeSafe: function () {
    assertException(function () { QuestionDistribution.create(null); }, 'TypeError');

    assertException(function () { QuestionDistribution.create({}); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([[1, 0, 0], [1, 0, 0], [1, 0]]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([[1, 0, 0], [1, 0], [1, 0, 0]]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([[1, 0], [1, 0, 0], [1, 0, 0]]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([[1, 0, 0], [1, 0, 0], [2, 0, 0]]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([[1, 0, 0], [2, 0, 0], [1, 0, 0]]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([[2, 0, 0], [1, 0, 0], [1, 0, 0]]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([[1, 0, 0], [1, 0, 0], [0, 0, 0]]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([[1, 0, 0], [0, 0, 0], [1, 0, 0]]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([[0, 0, 0], [1, 0, 0], [1, 0, 0]]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([[1, 0, 0], [1, 0, 0], [-1, 0, 0]]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([[1, 0, 0], [-1, 0, 0], [1, 0, 0]]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([[-1, 0, 0], [1, 0, 0], [1, 0, 0]]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([[1, 0, 0], [1, 0, 0], ['', 0, 0]]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([[1, 0, 0], ['', 0, 0], [1, 0, 0]]); }, 'TypeError');
    assertException(function () { QuestionDistribution.create([['', 0, 0], [1, 0, 0], [1, 0, 0]]); }, 'TypeError');
  }
});