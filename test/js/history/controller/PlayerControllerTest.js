var PlayerController = net.riemschneider.history.controller.PlayerController;

TestCase('PlayerControllerTest', {
  setUp: function () {
    PlayerController.resetState();
  },

  tearDown: function () {
    PlayerController.resetState();
  },

  testCreateLoadsDefault: function () {
    var playerController = PlayerController.create();
    var player = playerController.getPlayer();
    assertEquals('Name', player.getName());
    assertEquals(0, player.getAvatarImageIdx());
    assertEquals(0, player.getStatistics('topic').length);
  },

  testSavePlayer: function () {
    var playerController = PlayerController.create();
    var player = playerController.getPlayer();
    player.setName('saved');
    playerController.savePlayer();
    var other = PlayerController.create();
    assertEquals('saved', other.getPlayer().getName());
  }
});
