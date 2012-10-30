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
    assertException(function () { Opponent.create('ID', 'name', 1, Difficulty.EASY, null, []); }, 'TypeError');
    assertException(function () { Opponent.create('ID', 'name', 1, null, [], []); }, 'TypeError');
    assertException(function () { Opponent.create('ID', 'name', null, Difficulty.EASY, [], []); }, 'TypeError');
    assertException(function () { Opponent.create('ID', null, 1, Difficulty.EASY, [], []); }, 'TypeError');
    assertException(function () { Opponent.create(null, 'name', 1, Difficulty.EASY, [], []); }, 'TypeError');

    assertException(function () { Opponent.create('ID', 'name', 1, 'easy', [], []); }, 'TypeError');
    assertException(function () { Opponent.create('ID', 'name', '1', Difficulty.EASY, [], []); }, 'TypeError');
    assertException(function () { Opponent.create('ID', 1, 1, Difficulty.EASY, [], []); }, 'TypeError');
    assertException(function () { Opponent.create(1, 'name', '1', Difficulty.EASY, [], []); }, 'TypeError');
  },

  testCreateFromState: function () {
    var opponent = Opponent.createFromState({
      id: 'ID',
      name: 'name',
      avatarImageIdx: 1,
      difficulty: 'EASY',
      knowledgeChancesByLevel: [ 0.9, 0.5, 0.1 ],
      levelOrderChances: [ { levelOrder: [ 2, 1, 0 ], chance: 0.9 } ]
    });
    assertNotNull(opponent);
    assertEquals('ID', opponent.getId());
    assertEquals('name', opponent.getName());
    assertEquals(1, opponent.getAvatarImageIdx());
    assertSame(Difficulty.EASY, opponent.getDifficulty());
    assertEquals(0.9, opponent.getKnowledgeChance(0));
    assertEquals(0.5, opponent.getKnowledgeChance(1));
    assertEquals(0.1, opponent.getKnowledgeChance(2));
    assertEquals(1, opponent.getLevelOrderChances().length);
    assertEquals(0.9, opponent.getLevelOrderChances()[0].getChance());
  },

  testCreateFromStateNullAndTypeSafe: function () {
    var knowledgeChancesByLevel = [ 0.9, 0.5, 0.1 ];
    var levelOrderChances = [ { levelOrder: [ 2, 1, 0 ], chance: 0.9 } ];

    assertException(function () { Opponent.createFromState(null); }, 'TypeError');

    assertException(function () { Opponent.createFromState({ id: 'ID', name: 'name', avatarImageIdx: 1, difficulty: 'EASY', knowledgeChancesByLevel: knowledgeChancesByLevel }); }, 'TypeError');
    assertException(function () { Opponent.createFromState({ id: 'ID', name: 'name', avatarImageIdx: 1, difficulty: 'EASY', levelOrderChances: levelOrderChances }); }, 'TypeError');
    assertException(function () { Opponent.createFromState({ id: 'ID', name: 'name', avatarImageIdx: 1, knowledgeChancesByLevel: knowledgeChancesByLevel, levelOrderChances: levelOrderChances }); }, 'TypeError');
    assertException(function () { Opponent.createFromState({ id: 'ID', name: 'name', difficulty: 'EASY', knowledgeChancesByLevel: knowledgeChancesByLevel, levelOrderChances: levelOrderChances }); }, 'TypeError');
    assertException(function () { Opponent.createFromState({ id: 'ID', avatarImageIdx: 1, difficulty: 'EASY', knowledgeChancesByLevel: knowledgeChancesByLevel, levelOrderChances: levelOrderChances }); }, 'TypeError');
    assertException(function () { Opponent.createFromState({ name: 'name', avatarImageIdx: 1, difficulty: 'EASY', knowledgeChancesByLevel: knowledgeChancesByLevel, levelOrderChances: levelOrderChances }); }, 'TypeError');

    assertException(function () { Opponent.createFromState({ id: 'ID', name: 'name', avatarImageIdx: 1, difficulty: 'EASY', knowledgeChancesByLevel: knowledgeChancesByLevel, levelOrderChances: {} }); }, 'TypeError');
    assertException(function () { Opponent.createFromState({ id: 'ID', name: 'name', avatarImageIdx: 1, difficulty: 'EASY', knowledgeChancesByLevel: {}, levelOrderChances: levelOrderChances }); }, 'TypeError');
    assertException(function () { Opponent.createFromState({ id: 'ID', name: 'name', avatarImageIdx: 1, difficulty: 1, knowledgeChancesByLevel: knowledgeChancesByLevel, levelOrderChances: levelOrderChances }); }, 'TypeError');
    assertException(function () { Opponent.createFromState({ id: 'ID', name: 'name', avatarImageIdx: '1', difficulty: 'EASY', knowledgeChancesByLevel: knowledgeChancesByLevel, levelOrderChances: levelOrderChances }); }, 'TypeError');
    assertException(function () { Opponent.createFromState({ id: 'ID', name: 1, avatarImageIdx: 1, difficulty: 'EASY', knowledgeChancesByLevel: knowledgeChancesByLevel, levelOrderChances: levelOrderChances }); }, 'TypeError');
    assertException(function () { Opponent.createFromState({ id: 1, name: 'name', avatarImageIdx: 1, difficulty: 'EASY', knowledgeChancesByLevel: knowledgeChancesByLevel, levelOrderChances: levelOrderChances }); }, 'TypeError');
  }
});
