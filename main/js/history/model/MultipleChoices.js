net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var Answer = net.riemschneider.history.model.Answer;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.MultipleChoices = TypeUtils.enhance('net.riemschneider.history.model.MultipleChoices', {
    create: function create(time, choices) {
      ArgumentUtils.assertArray(choices, function (elem) { ArgumentUtils.assertString(elem); });
      ArgumentUtils.assertTrue(choices.length > 0);

      var answer = Answer.create(time);
      answer.getChoices = function getChoices() { return choices; };
      return answer;
    }
  });
}());
