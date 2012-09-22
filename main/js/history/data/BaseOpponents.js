net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  var Difficulty = net.riemschneider.history.model.Difficulty;
  var Opponent = net.riemschneider.history.model.Opponent;
  var LevelOrderChance = net.riemschneider.history.model.LevelOrderChance;

  net.riemschneider.history.data.BaseOpponents = {
    init: function init(opponents) {
      opponents.push(Opponent.create('OPP0', 'Hans', 0, Difficulty.HARD, [ 0.9, 0.8, 0.5 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.9),
        LevelOrderChance.create([ 2, 1, 0 ], 0.1)
      ]));
      opponents.push(Opponent.create('OPP1', 'Günther', 1, Difficulty.HARD, [ 0.95, 0.85, 0.7 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.9),
        LevelOrderChance.create([ 1, 0, 2 ], 0.1)
      ]));
      opponents.push(Opponent.create('OPP2', 'Martin', 2, Difficulty.MEDIUM, [ 0.8, 0.5, 0.2 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.5),
        LevelOrderChance.create([ 0, 1, 2 ], 0.5)
      ]));
      opponents.push(Opponent.create('OPP3', 'Dr. Siegfried', 3, Difficulty.MEDIUM, [ 0.8, 0.7, 0.5 ], [
        LevelOrderChance.create([ 2, 1, 0 ], 0.7),
        LevelOrderChance.create([ 1, 2, 0 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP4', 'Sebastian', 4, Difficulty.HARD, [ 0.95, 0.9, 0.8 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.8),
        LevelOrderChance.create([ 2, 1, 0 ], 0.2)
      ]));
      opponents.push(Opponent.create('OPP5', 'Tom', 5, Difficulty.MEDIUM, [ 0.8, 0.7, 0.3 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.7),
        LevelOrderChance.create([ 1, 0, 2 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP6', 'Wolfgang', 6, Difficulty.HARD, [ 0.9, 0.6, 0.5 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.6),
        LevelOrderChance.create([ 2, 1, 0 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP7', 'Christian', 7, Difficulty.MEDIUM, [ 0.8, 0.8, 0.7 ], [
        LevelOrderChance.create([ 2, 1, 0 ], 0.7),
        LevelOrderChance.create([ 1, 2, 0 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP8', 'Cem', 8, Difficulty.MEDIUM, [ 0.85, 0.75, 0.5 ], [
        LevelOrderChance.create([ 1, 2, 0 ], 0.6),
        LevelOrderChance.create([ 0, 2, 1 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP9', 'Rob', 9, Difficulty.EASY, [ 0.6, 0.5, 0.2 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.6),
        LevelOrderChance.create([ 2, 1, 0 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP10', 'Garreth', 10, Difficulty.EASY, [ 0.7, 0.5, 0.2 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.7),
        LevelOrderChance.create([ 1, 0, 2 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP11', 'Michael', 11, Difficulty.EASY, [ 0.6, 0.4, 0.1 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.6),
        LevelOrderChance.create([ 0, 1, 2 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP12', 'Johannes', 12, Difficulty.HARD, [ 0.9, 0.8, 0.3 ], [
        LevelOrderChance.create([ 1, 2, 0 ], 0.7),
        LevelOrderChance.create([ 2, 1, 0 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP13', 'Paul', 13, Difficulty.MEDIUM, [ 0.8, 0.5, 0.2 ],[
        LevelOrderChance.create([ 1, 0, 2 ], 0.8),
        LevelOrderChance.create([ 2, 1, 0 ], 0.2)
      ]));
      opponents.push(Opponent.create('OPP14', 'Andreas', 14, Difficulty.EASY, [ 0.7, 0.4, 0.2 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.7),
        LevelOrderChance.create([ 2, 0, 1 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP15', 'Manfred', 15, Difficulty.HARD, [ 0.9, 0.3, 0.1 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.7),
        LevelOrderChance.create([ 1, 0, 2 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP16', 'Jasamin', 16, Difficulty.EASY, [ 0.7, 0.6, 0.5 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.8),
        LevelOrderChance.create([ 1, 0, 2 ], 0.2)
      ]));
      opponents.push(Opponent.create('OPP17', 'Marlene', 17, Difficulty.MEDIUM, [ 0.8, 0.5, 0.3 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.7),
        LevelOrderChance.create([ 2, 1, 0 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP18', 'Anna', 18, Difficulty.MEDIUM, [ 0.8, 0.6, 0.4 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.9),
        LevelOrderChance.create([ 1, 0, 2 ], 0.1)
      ]));
      opponents.push(Opponent.create('OPP19', 'Sarah', 19, Difficulty.EASY, [ 0.7, 0.5, 0.2 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.7),
        LevelOrderChance.create([ 0, 1, 2 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP20', 'Fida', 20, Difficulty.HARD, [ 0.9, 0.7, 0.6 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.5),
        LevelOrderChance.create([ 2, 1, 0 ], 0.5)
      ]));
      opponents.push(Opponent.create('OPP21', 'Samira', 21, Difficulty.MEDIUM, [ 0.8, 0.8, 0.7 ], [
        LevelOrderChance.create([ 1, 2, 0 ], 0.7),
        LevelOrderChance.create([ 0, 1, 2 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP22', 'Hildegard', 22, Difficulty.MEDIUM, [ 0.8, 0.7, 0.6 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.7),
        LevelOrderChance.create([ 2, 0, 1 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP23', 'Keyomi', 23, Difficulty.HARD, [ 0.9, 0.6, 0.2 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.5),
        LevelOrderChance.create([ 1, 0, 2 ], 0.5)
      ]));
      opponents.push(Opponent.create('OPP24', 'Bea', 24, Difficulty.EASY, [ 0.7, 0.4, 0.3 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.5),
        LevelOrderChance.create([ 0, 1, 2 ], 0.5)
      ]));
      opponents.push(Opponent.create('OPP25', 'Heike', 25, Difficulty.MEDIUM, [ 0.8, 0.5, 0.1 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.6),
        LevelOrderChance.create([ 1, 0, 2 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP26', 'Jane', 26, Difficulty.MEDIUM, [ 0.8, 0.6, 0.3 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.8),
        LevelOrderChance.create([ 2, 0, 1 ], 0.2)
      ]));
      opponents.push(Opponent.create('OPP27', 'Stefanie', 27, Difficulty.EASY, [ 0.7, 0.4, 0.3 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.6),
        LevelOrderChance.create([ 0, 1, 2 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP28', 'Kevin', 28, Difficulty.EASY, [ 0.6, 0.4, 0.1 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.6),
        LevelOrderChance.create([ 1, 0, 2 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP29', 'Kai', 29, Difficulty.EASY, [ 0.5, 0.4, 0.2 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.6),
        LevelOrderChance.create([ 0, 2, 1 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP30', 'Frieda', 30, Difficulty.EASY, [ 0.7, 0.4, 0.3 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.7),
        LevelOrderChance.create([ 1, 0, 2 ], 0.3)
      ]));
    }
  };
}());
