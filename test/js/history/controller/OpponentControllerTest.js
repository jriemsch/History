var OpponentController = net.riemschneider.history.controller.OpponentController;
var Random = net.riemschneider.utils.Random;
var Opponent = net.riemschneider.history.model.Opponent;
var LevelOrderChance = net.riemschneider.history.model.LevelOrderChance;

TestCase('OpponentControllerTest', {
  setUp: function () {
    this.opponentList = [
      Opponent.create('OPP0', 'Hans Schenk', 0, [ 0.9, 0.8, 0.5 ], []),
      Opponent.create('OPP1', 'Günther Wernbach', 1, [ 0.95, 0.85, 0.7 ], []),
      Opponent.create('OPP2', 'Martin Salm', 2, [ 0.8, 0.5, 0.2 ], []),
      Opponent.create('OPP3', 'Dr. Siegfried Hubertus', 3, [ 0.8, 0.7, 0.5 ], []),
      Opponent.create('OPP4', 'Sebastian Weier', 4, [ 0.95, 0.9, 0.8 ], []),
      Opponent.create('OPP5', 'Tom Stark', 5, [ 0.8, 0.7, 0.3 ], [])
    ];
  },

  testGetRandomOpponentPairings: function () {
    var controller = OpponentController.create(this.opponentList);
    Random.setNext([0.1, 0.2, 0.3, 0.1]);
    var pairings = controller.getRandomOpponentPairings(2);
    assertEquals(2, pairings.length);
    assertEquals(0, pairings[0].first.getAvatarImageIdx());
    assertEquals(2, pairings[0].second.getAvatarImageIdx());
    assertEquals(3, pairings[1].first.getAvatarImageIdx());
    assertEquals(1, pairings[1].second.getAvatarImageIdx());
  }
});
