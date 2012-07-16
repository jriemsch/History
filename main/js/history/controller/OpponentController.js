net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var Random = net.riemschneider.utils.Random;
  var ArrayUtils = net.riemschneider.utils.ArrayUtils;

  net.riemschneider.history.controller.OpponentController = {
    create: function create(opponentList) {
      return {
        getRandomOpponentPairings: function getRandomOpponentPairings(count) {
          var result = [];
          var opponentListCopy = opponentList.slice();
          for (var idx = 0; idx < count; ++idx) {
            result[idx] = { first: getRandomOpponent(), second: getRandomOpponent() };
          }

          function getRandomOpponent() {
            var rnd = Math.floor(Random.next() * opponentListCopy.length);
            var opponent = opponentListCopy[rnd];
            ArrayUtils.removeElementAt(opponentListCopy, rnd);
            return opponent;
          }

          return result;
        }
      };
    }
  };
}());
