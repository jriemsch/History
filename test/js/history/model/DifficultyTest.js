var Difficulty = net.riemschneider.history.model.Difficulty;

TestCase('DifficultyTest', {
  testEasier: function () {
    assertSame(Difficulty.EASY, Difficulty.EASY.easier());
    assertSame(Difficulty.EASY, Difficulty.MEDIUM.easier());
    assertSame(Difficulty.MEDIUM, Difficulty.HARD.easier());
  }
});
