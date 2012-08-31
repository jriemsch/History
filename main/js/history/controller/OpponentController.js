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
          for (var idx = 0, len = Difficulty.values.length; idx < len; ++idx) {
            var difficulty = Difficulty.values[idx];
            results[difficulty.key] = getRandomOpponentPairings(difficulty);
          }

          function createOpponentsByDifficultyMap() {
            var map = {};
            for (var idx = 0, len = Difficulty.values.length; idx < len; ++idx) {
              var difficulty = Difficulty.values[idx];
              map[difficulty.key] = createOpponentsByDifficulty(difficulty);
            }
            return map;
          }

          function createOpponentsByDifficulty(difficulty) {
            return ArrayUtils.filter(opponentList, function (opponent) { return opponent.getDifficulty() === difficulty; });
          }

          function getRandomOpponentPairings(difficulty) {
            var pairings = [];
            for (var idx = 0; idx < countPerDifficulty; ++idx) {
              var difficulty1 = difficulty;
              var difficulty2 = difficulty;
              if (Random.next() >= 0.5) {
                if (Random.next() >= 0.5) {
                  difficulty1 = difficulty1.easier();
                } else {
                  difficulty2 = difficulty2.easier();
                }
              }
              pairings[idx] = { first: getRandomOpponent(difficulty1), second: getRandomOpponent(difficulty2) };
            }

            return pairings;
          }

          function getRandomOpponent(difficulty) {
            var opponents = opponentsByDifficulty[difficulty.key];
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
