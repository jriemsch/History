net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var Answer = net.riemschneider.history.model.Answer;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.OrderChoice = TypeUtils.enhance('net.riemschneider.history.model.OrderChoice', {
    create: function create(time, choices, correctOrder) {
      ArgumentUtils.assertArray(choices, function (elem) { ArgumentUtils.assertString(elem); });
      ArgumentUtils.assertTrue(choices.length > 0);
      ArgumentUtils.assertArray(correctOrder, function (elem) { ArgumentUtils.assertRange(elem, 0, choices.length - 1); });

      var answer = Answer.create(time);
      answer.getChoices = function getChoices() { return choices; };
      answer.getCorrectOrder = function getCorrectOrder() { return correctOrder; };
      return answer;
    }
  });
}());
