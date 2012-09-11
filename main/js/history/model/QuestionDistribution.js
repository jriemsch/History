net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Difficulty = net.riemschneider.history.model.Difficulty;

  net.riemschneider.history.model.QuestionDistribution = {
    create: function (distributions) {
      ArgumentUtils.assertArray(distributions);
      ArgumentUtils.assertTrue(distributions.length === Difficulty.values.length);

      var distributionByDifficulty = {};
      for (var idx = 0, len = distributions.length; idx < len; ++idx) {
        distributionByDifficulty[Difficulty.values[idx].key] = defineDistribution(distributions[idx]);
      }

      function defineDistribution(percentages) {
        ArgumentUtils.assertTrue(percentages.length === Difficulty.values.length);
        var sum = 0;
        var distribution = {};
        for (var idx = 0, len = percentages.length; idx < len; ++idx) {
          var percentage = percentages[idx];
          ArgumentUtils.assertRange(percentage, 0, 1);
          distribution[Difficulty.values[idx].key] = percentage;
          sum += percentage;
        }
        ArgumentUtils.assertTrue(sum >= 0.99999 && sum <= 1.00001);
        return distribution;
      }

      return {
        getDistribution: function getDistribution(difficulty) {
          return distributionByDifficulty[difficulty.key];
        }
      };
    }
  };

TypeUtils.enhance('net.riemschneider.history.model.QuestionDistribution', net.riemschneider.history.model.QuestionDistribution);
}());
