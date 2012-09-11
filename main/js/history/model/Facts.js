net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ArrayUtils = net.riemschneider.utils.ArrayUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Difficulty = net.riemschneider.history.model.Difficulty;

  net.riemschneider.history.model.Facts = {
    create: function (facts) {
      ArgumentUtils.assertArray(facts, function (elem) {
        ArgumentUtils.assertType(elem, net.riemschneider.history.model.Fact);
      });

      var factsByDifficulty = {};
      for (var idx = 0, len = Difficulty.values.length; idx < len; ++idx) {
        var difficulty = Difficulty.values[idx];
        factsByDifficulty[difficulty.key] = filterFacts(difficulty);
      }

      function filterFacts(difficulty) {
        return ArrayUtils.filter(facts, function (fact) { return fact.getQuestionsOfDifficulty(difficulty).length > 0; });
      }

      return {
        getFacts: function getFacts() { return facts; },
        getFactsOfDifficulty: function getFactsOfDifficulty(difficulty) { return factsByDifficulty[difficulty.key]; }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Facts', net.riemschneider.history.model.Facts);
}());
