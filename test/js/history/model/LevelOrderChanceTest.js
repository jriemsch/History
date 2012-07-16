var LevelOrderChance = net.riemschneider.history.model.LevelOrderChance;

TestCase('LevelOrderChanceTest', {
  testCreate: function () {
    var levelOrder = [ 2, 1, 0 ];
    var levelOrderChance = LevelOrderChance.create(levelOrder, 0.9);
    assertNotNull(levelOrderChance);
    assertEquals(0.9, levelOrderChance.getChance());
    assertSame(levelOrder, levelOrderChance.getLevelOrder());
  },

  testCreateTypeSafe: function () {
    assertException(function () { LevelOrderChance.create([], null); }, 'TypeError');
    assertException(function () { LevelOrderChance.create(null, 1); }, 'TypeError');
    assertException(function () { LevelOrderChance.create([], 1.1); }, 'TypeError');
    assertException(function () { LevelOrderChance.create([], -1); }, 'TypeError');
    assertException(function () { LevelOrderChance.create([ -1 ], 1); }, 'TypeError');
    assertException(function () { LevelOrderChance.create([ 1 ], 1); }, 'TypeError');
  }
});