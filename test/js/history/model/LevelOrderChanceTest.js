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
  },

  testCreateFromState: function () {
    var levelOrderChance = LevelOrderChance.createFromState({ levelOrder: [ 2, 1, 0 ], chance: 0.9 });
    assertNotNull(levelOrderChance);
    assertEquals(0.9, levelOrderChance.getChance());
    assertEquals(3, levelOrderChance.getLevelOrder().length);
    assertEquals(2, levelOrderChance.getLevelOrder()[0]);
    assertEquals(1, levelOrderChance.getLevelOrder()[1]);
    assertEquals(0, levelOrderChance.getLevelOrder()[2]);
  },

  testCreateFromStateNullAndTypeSafe: function () {
    assertException(function () { LevelOrderChance.createFromState(null); }, 'TypeError');

    assertException(function () { LevelOrderChance.createFromState({ levelOrder: [ 2, 1, 0 ] }); }, 'TypeError');
    assertException(function () { LevelOrderChance.createFromState({ chance: 0.9 }); }, 'TypeError');

    assertException(function () { LevelOrderChance.createFromState({ levelOrder: [ 2, 1, 0 ], chance: {} }); }, 'TypeError');
    assertException(function () { LevelOrderChance.createFromState({ levelOrder: {}, chance: 0.9 }); }, 'TypeError');
  }
});