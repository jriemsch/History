net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var QuestionDistribution = net.riemschneider.history.model.QuestionDistribution;
  var WebUtils = net.riemschneider.utils.WebUtils;

  net.riemschneider.history.data.QuestionDistributionReader = {
    create: function create() {
      return {
        read: function read(file, setDistribution, onDone) {
          ArgumentUtils.assertString(file);
          ArgumentUtils.assertFunction(setDistribution);
          ArgumentUtils.assertFunction(onDone);

          WebUtils.getJson(file, parseDistributionData);

          function parseDistributionData(data) {
            var distribution = QuestionDistribution.create(data);
            setDistribution(distribution);
            onDone();
          }
        }
      };
    }
  };
}());
