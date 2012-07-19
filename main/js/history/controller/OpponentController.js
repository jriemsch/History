net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var Random = net.riemschneider.utils.Random;
  var ArrayUtils = net.riemschneider.utils.ArrayUtils;
  var Difficulty = net.riemschneider.history.model.Difficulty;

  net.riemschneider.history.controller.OpponentController = {
    create: function create(opponentList) {
      return {
        getRandomOpponentPairings: function getRandomOpponentPairings(countPerDifficulty) {
          var opponentsByDifficulty = createOpponentsByDifficultyMap();

          var results = {};
          for (var difficulty in Difficulty) {
            results[difficulty] = getRandomOpponentPairings(difficulty);
          }

          function createOpponentsByDifficultyMap() {
            var map = {};
            for (var difficulty in Difficulty) {
              map[difficulty] = createOpponentsByDifficulty(difficulty);
            }
            return map;
          }

          function createOpponentsByDifficulty(difficulty) {
            return ArrayUtils.filter(opponentList, function (opponent) { return opponent.getDifficulty() === Difficulty[difficulty]; })
          }

          function getRandomOpponentPairings(difficulty) {
            var pairings = [];
            for (var idx = 0; idx < countPerDifficulty; ++idx) {
              var difficulty1 = difficulty;
              var difficulty2 = difficulty;
              if (Random.next() >= 0.5) {
                if (Random.next() >= 0.5) {
                  difficulty1 = Difficulty[difficulty1].easier().key;
                } else {
                  difficulty2 = Difficulty[difficulty2].easier().key;
                }
              }
              pairings[idx] = { first: getRandomOpponent(difficulty1), second: getRandomOpponent(difficulty2) };
            }

            return pairings;
          }

          function getRandomOpponent(difficulty) {
            var opponents = opponentsByDifficulty[difficulty];
            var rnd = Math.floor(Random.next() * opponents.length);
            var opponent = opponents[rnd];
            ArrayUtils.removeElementAt(opponents, rnd);
            return opponent;
          }

          return results;
        }
      };
    }
  };
}());
