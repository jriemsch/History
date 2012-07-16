var Player = net.riemschneider.history.model.Player;

TestCase('PlayerTest', {
  testCreate: function () {
    var player = Player.create('name', 5);
    assertNotNull(player);
    assertEquals('name', player.getName());
    assertEquals(5, player.getAvatarImageIdx());
  },

  testCreateNullSafe: function () {
    assertException(function () { Player.create('name'); }, 'TypeError');
    assertException(function () { Player.create(null, 1); }, 'TypeError');
  },

  testSetters: function () {
    var player = Player.create('name', 5);
    player.setName('other');
    player.setAvatarImageIdx(2);
    assertEquals('other', player.getName());
    assertEquals(2, player.getAvatarImageIdx());
  },

  testSettersNullSafe: function () {
    var player = Player.create('name', 5);
    assertException(function () { player.setName(null); }, 'TypeError');
    assertException(function () { player.setAvatarImageIdx(null); }, 'TypeError');
  },

  testAddStatistics: function () {
    var player = Player.create('name', 5);
    player.addStatistics('topic', 200);
    player.addStatistics('topic', 250);
    player.addStatistics('other', 250);
    var stats = player.getStatistics('topic');
    assertEquals(2, stats.length);
    assertEquals(200, stats[0]);
    assertEquals(250, stats[1]);
  },

  testGetAndSetState: function () {
    var player = Player.create('name', 5);
    player.addStatistics('topic', 200);
    var other = Player.create('other', 0);
    other.setState(player.getState());
    assertEquals('name', player.getName());
    assertEquals(5, player.getAvatarImageIdx());
    var stats = player.getStatistics('topic');
    assertEquals(1, stats.length);
    assertEquals(200, stats[0]);
  },

  testSetStateNullSafe: function () {
    var player = Player.create('name', 5);
    assertException(function () { player.setState(null); }, 'TypeError');
    assertException(function () { player.setState({ avatarImageIdx: 2, statistics: {}}); }, 'TypeError');
    assertException(function () { player.setState({ name: 'test', statistics: {}}); }, 'TypeError');
    assertException(function () { player.setState({ name: 'test', avatarImageIdx: 2}); }, 'TypeError');
  }
});
