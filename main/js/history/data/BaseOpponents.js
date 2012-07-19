net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  var Difficulty = net.riemschneider.history.model.Difficulty;
  var Opponent = net.riemschneider.history.model.Opponent;
  var LevelOrderChance = net.riemschneider.history.model.LevelOrderChance;

  net.riemschneider.history.data.BaseOpponents = {
    init: function init(opponents) {
      opponents.push(Opponent.create('OPP0', 'Hans Schenk', 0, Difficulty.HARD, [ 0.9, 0.8, 0.5 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.9),
        LevelOrderChance.create([ 2, 1, 0 ], 0.1)
      ]));
      opponents.push(Opponent.create('OPP1', 'Günther Wernbach', 1, Difficulty.HARD, [ 0.95, 0.85, 0.7 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.9),
        LevelOrderChance.create([ 1, 0, 2 ], 0.1)
      ]));
      opponents.push(Opponent.create('OPP2', 'Martin Salm', 2, Difficulty.MEDIUM, [ 0.8, 0.5, 0.2 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.5),
        LevelOrderChance.create([ 0, 1, 2 ], 0.5)
      ]));
      opponents.push(Opponent.create('OPP3', 'Dr. Siegfried Hubertus', 3, Difficulty.MEDIUM, [ 0.8, 0.7, 0.5 ], [
        LevelOrderChance.create([ 2, 1, 0 ], 0.7),
        LevelOrderChance.create([ 1, 2, 0 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP4', 'Sebastian Weier', 4, Difficulty.HARD, [ 0.95, 0.9, 0.8 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.8),
        LevelOrderChance.create([ 2, 1, 0 ], 0.2)
      ]));
      opponents.push(Opponent.create('OPP5', 'Tom Stark', 5, Difficulty.MEDIUM, [ 0.8, 0.7, 0.3 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.7),
        LevelOrderChance.create([ 1, 0, 2 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP6', 'Wolfgang Herne', 6, Difficulty.HARD, [ 0.9, 0.6, 0.5 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.6),
        LevelOrderChance.create([ 2, 1, 0 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP7', 'Christian Warnhorst', 7, Difficulty.MEDIUM, [ 0.8, 0.8, 0.7 ], [
        LevelOrderChance.create([ 2, 1, 0 ], 0.7),
        LevelOrderChance.create([ 1, 2, 0 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP8', 'Cem Akin', 8, Difficulty.MEDIUM, [ 0.85, 0.75, 0.5 ], [
        LevelOrderChance.create([ 1, 2, 0 ], 0.6),
        LevelOrderChance.create([ 0, 2, 1 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP9', 'Rob Jameson', 9, Difficulty.EASY, [ 0.6, 0.5, 0.2 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.6),
        LevelOrderChance.create([ 2, 1, 0 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP10', 'Garreth Hammer', 10, Difficulty.EASY, [ 0.7, 0.5, 0.2 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.7),
        LevelOrderChance.create([ 1, 0, 2 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP11', 'Michael Sanders', 11, Difficulty.EASY, [ 0.6, 0.4, 0.1 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.6),
        LevelOrderChance.create([ 0, 1, 2 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP12', 'Johannes Stuck', 12, Difficulty.HARD, [ 0.9, 0.8, 0.3 ], [
        LevelOrderChance.create([ 1, 2, 0 ], 0.7),
        LevelOrderChance.create([ 2, 1, 0 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP13', 'Paul Siller', 13, Difficulty.MEDIUM, [ 0.8, 0.5, 0.2 ],[
        LevelOrderChance.create([ 1, 0, 2 ], 0.8),
        LevelOrderChance.create([ 2, 1, 0 ], 0.2)
      ]));
      opponents.push(Opponent.create('OPP14', 'Andreas Stadler', 14, Difficulty.EASY, [ 0.7, 0.4, 0.2 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.7),
        LevelOrderChance.create([ 2, 0, 1 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP15', 'Manfred Walters', 15, Difficulty.HARD, [ 0.9, 0.3, 0.1 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.7),
        LevelOrderChance.create([ 1, 0, 2 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP16', 'Jasamin Aziz', 16, Difficulty.EASY, [ 0.7, 0.6, 0.5 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.8),
        LevelOrderChance.create([ 1, 0, 2 ], 0.2)
      ]));
      opponents.push(Opponent.create('OPP17', 'Marlene von Leffern', 17, Difficulty.MEDIUM, [ 0.8, 0.5, 0.3 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.7),
        LevelOrderChance.create([ 2, 1, 0 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP18', 'Anna Wilberg', 18, Difficulty.MEDIUM, [ 0.8, 0.6, 0.4 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.9),
        LevelOrderChance.create([ 1, 0, 2 ], 0.1)
      ]));
      opponents.push(Opponent.create('OPP19', 'Sarah Blume', 19, Difficulty.EASY, [ 0.7, 0.5, 0.2 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.7),
        LevelOrderChance.create([ 0, 1, 2 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP20', 'Fida Moussa', 20, Difficulty.HARD, [ 0.9, 0.7, 0.6 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.5),
        LevelOrderChance.create([ 2, 1, 0 ], 0.5)
      ]));
      opponents.push(Opponent.create('OPP21', 'Samira Tauber', 21, Difficulty.MEDIUM, [ 0.8, 0.8, 0.7 ], [
        LevelOrderChance.create([ 1, 2, 0 ], 0.7),
        LevelOrderChance.create([ 0, 1, 2 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP22', 'Hildegard Wagner', 22, Difficulty.MEDIUM, [ 0.8, 0.7, 0.6 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.7),
        LevelOrderChance.create([ 2, 0, 1 ], 0.3)
      ]));
      opponents.push(Opponent.create('OPP23', 'Keyomi Zhao', 23, Difficulty.HARD, [ 0.9, 0.6, 0.2 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.5),
        LevelOrderChance.create([ 1, 0, 2 ], 0.5)
      ]));
      opponents.push(Opponent.create('OPP24', 'Bea Heynes', 24, Difficulty.EASY, [ 0.7, 0.4, 0.3 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.5),
        LevelOrderChance.create([ 0, 1, 2 ], 0.5)
      ]));
      opponents.push(Opponent.create('OPP25', 'Heike Janosch', 25, Difficulty.MEDIUM, [ 0.8, 0.5, 0.1 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.6),
        LevelOrderChance.create([ 1, 0, 2 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP26', 'Jane Porter', 26, Difficulty.MEDIUM, [ 0.8, 0.6, 0.3 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.8),
        LevelOrderChance.create([ 2, 0, 1 ], 0.2)
      ]));
      opponents.push(Opponent.create('OPP27', 'Stefanie Palmer', 27, Difficulty.EASY, [ 0.7, 0.4, 0.3 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.6),
        LevelOrderChance.create([ 0, 1, 2 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP28', 'Kevin Seifert', 28, Difficulty.EASY, [ 0.6, 0.4, 0.1 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.6),
        LevelOrderChance.create([ 1, 0, 2 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP29', 'Kai von Braune', 29, Difficulty.EASY, [ 0.5, 0.4, 0.2 ], [
        LevelOrderChance.create([ 1, 0, 2 ], 0.6),
        LevelOrderChance.create([ 0, 2, 1 ], 0.4)
      ]));
      opponents.push(Opponent.create('OPP30', 'Frieda Tolrat', 30, Difficulty.EASY, [ 0.7, 0.4, 0.3 ], [
        LevelOrderChance.create([ 0, 1, 2 ], 0.7),
        LevelOrderChance.create([ 1, 0, 2 ], 0.3)
      ]));
    }
  };
}());
