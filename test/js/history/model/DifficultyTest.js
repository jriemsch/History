var Difficulty = net.riemschneider.history.model.Difficulty;

TestCase('DifficultyTest', {
  testEasier: function () {
    assertSame(Difficulty.EASY, Difficulty.EASY.easier());
    assertSame(Difficulty.EASY, Difficulty.MEDIUM.easier());
    assertSame(Difficulty.MEDIUM, Difficulty.HARD.easier());
  },

  testLoop: function () {
    var expected = [ Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD ];
    var len = Difficulty.values.length;
    assertEquals(3, len);
    for (var idx = 0; idx < len; ++idx) {
      var difficulty = Difficulty.values[idx];
      assertSame(expected[idx], difficulty);
    }
  }
});
