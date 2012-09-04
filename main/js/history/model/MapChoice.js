net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var Answer = net.riemschneider.history.model.Answer;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.MapChoice = {
    create: function create(time, choices, mappings, correctOrder) {
      ArgumentUtils.assertArray(choices, function (elem) { ArgumentUtils.assertString(elem); });
      ArgumentUtils.assertTrue(choices.length > 0);
      ArgumentUtils.assertArray(mappings, function (elem) { ArgumentUtils.assertString(elem); });
      ArgumentUtils.assertTrue(mappings.length === choices.length);
      ArgumentUtils.assertArray(correctOrder, function (elem) { ArgumentUtils.assertRange(elem, 0, choices.length - 1); });
      ArgumentUtils.assertTrue(correctOrder.length === choices.length);

      var answer = Answer.create(time);
      answer.getChoices = function getChoices() { return choices; };
      answer.getCorrectOrder = function getCorrectOrder() { return correctOrder; };
      answer.getMappings = function getMappings() { return mappings; };
      return answer;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.MapChoice', net.riemschneider.history.model.MapChoice);
}());
