var Difficulty = net.riemschneider.history.model.Difficulty;
var OpponentController = net.riemschneider.history.controller.OpponentController;
var Random = net.riemschneider.utils.Random;
var Opponent = net.riemschneider.history.model.Opponent;
var LevelOrderChance = net.riemschneider.history.model.LevelOrderChance;

TestCase('OpponentControllerTest', {
  setUp: function () {
    this.opponents = [
      Opponent.create('OPP0', 'Hans Schenk', 0, Difficulty.HARD, [ 0.9, 0.8, 0.5 ], []),
      Opponent.create('OPP1', 'Günther Wernbach', 1, Difficulty.EASY, [ 0.95, 0.85, 0.7 ], []),
      Opponent.create('OPP2', 'Martin Salm', 2, Difficulty.MEDIUM, [ 0.8, 0.5, 0.2 ], []),
      Opponent.create('OPP3', 'Dr. Siegfried Hubertus', 3, Difficulty.MEDIUM, [ 0.8, 0.7, 0.5 ], []),
      Opponent.create('OPP4', 'Sebastian Weier', 4, Difficulty.HARD, [ 0.95, 0.9, 0.8 ], []),
      Opponent.create('OPP5', 'Tom Stark', 5, Difficulty.EASY, [ 0.8, 0.7, 0.3 ], []),
      Opponent.create('OPP6', 'Phillip', 6, Difficulty.EASY, [ 0.8, 0.7, 0.3 ], [])
    ];
  },

  testGetRandomOpponentPairings: function () {
    var controller = OpponentController.create(this.opponents);
    Random.setNext([0, 0.1, 0.6, 1, 0, 0.3, 0.1, 1, 1, 0.8, 0.9]);
    var pairings = controller.getRandomOpponentPairings(1);
    assertEquals(1, pairings[Difficulty.EASY.key].length);
    assertEquals(1, pairings[Difficulty.EASY.key][0].first.getAvatarImageIdx());
    assertEquals(6, pairings[Difficulty.EASY.key][0].second.getAvatarImageIdx());
    assertEquals(1, pairings[Difficulty.MEDIUM.key].length);
    assertEquals(2, pairings[Difficulty.MEDIUM.key][0].first.getAvatarImageIdx());
    assertEquals(5, pairings[Difficulty.MEDIUM.key][0].second.getAvatarImageIdx());
    assertEquals(1, pairings[Difficulty.HARD.key].length);
    assertEquals(3, pairings[Difficulty.HARD.key][0].first.getAvatarImageIdx());
    assertEquals(4, pairings[Difficulty.HARD.key][0].second.getAvatarImageIdx());
  }
});
