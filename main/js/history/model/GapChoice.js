net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var Answer = net.riemschneider.history.model.Answer;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Gap = net.riemschneider.history.model.Gap;

  net.riemschneider.history.model.GapChoice = {
    create: function create(time, choices, gaps) {
      ArgumentUtils.assertArray(choices, function (elem) { ArgumentUtils.assertString(elem); });
      ArgumentUtils.assertTrue(choices.length > 0);
      ArgumentUtils.assertMap(gaps, function (key, value) { ArgumentUtils.assertType(value, Gap); });

      var answer = Answer.create(time);
      answer.getChoices = function getChoices() { return choices; };
      answer.getGaps = function getGaps() { return gaps; };
      return answer;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.GapChoice', net.riemschneider.history.model.GapChoice);
}());
