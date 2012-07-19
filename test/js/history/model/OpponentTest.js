var Difficulty = net.riemschneider.history.model.Difficulty;
var Opponent = net.riemschneider.history.model.Opponent;

TestCase('OpponentTest', {
  testCreate: function () {
    var levelOrderChances = [];
    var opponent = Opponent.create('ID', 'name', 1, Difficulty.EASY, [ 0.9, 0.5, 0.1 ], levelOrderChances);
    assertNotNull(opponent);
    assertEquals('ID', opponent.getId());
    assertEquals('name', opponent.getName());
    assertEquals(1, opponent.getAvatarImageIdx());
    assertSame(Difficulty.EASY, opponent.getDifficulty());
    assertEquals(0.9, opponent.getKnowledgeChance(0));
    assertEquals(0.5, opponent.getKnowledgeChance(1));
    assertEquals(0.1, opponent.getKnowledgeChance(2));
    assertSame(levelOrderChances, opponent.getLevelOrderChances());
  },

  testCreateTypeSafe: function () {
    assertException(function () { Opponent.create('ID', 'name', 1, Difficulty.EASY, [], null); }, 'TypeError');
    assertException(function () { Opponent.create('ID', 'name', 1, Difficulty.EASY, null, {}); }, 'TypeError');
    assertException(function () { Opponent.create('ID', 'name', 1, null, [], {}); }, 'TypeError');
    assertException(function () { Opponent.create('ID', 'name', null, Difficulty.EASY, [], {}); }, 'TypeError');
    assertException(function () { Opponent.create('ID', null, 1, Difficulty.EASY, [], {}); }, 'TypeError');
    assertException(function () { Opponent.create(null, 'name', 1, Difficulty.EASY, [], {}); }, 'TypeError');

    assertException(function () { Opponent.create('ID', 'name', 1, 'easy', [], {}); }, 'TypeError');
  }
});
