net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var Answer = net.riemschneider.history.model.Answer;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var DateSelector = net.riemschneider.history.model.DateSelector;

  net.riemschneider.history.model.TimeChoice = {
    create: function create(time, from, to, correct) {
      ArgumentUtils.assertType(from, DateSelector);
      ArgumentUtils.assertType(to, DateSelector);
      ArgumentUtils.assertType(correct, DateSelector);
      ArgumentUtils.assertTrue(from.getSelectorType() === to.getSelectorType());
      ArgumentUtils.assertTrue(from.getSelectorType() === correct.getSelectorType());
      ArgumentUtils.assertTrue(from.getValue() < to.getValue());
      ArgumentUtils.assertRange(correct.getValue(), from.getValue(), to.getValue());

      var answer = Answer.create(time);
      answer.getFrom = function getFrom() { return from; };
      answer.getTo = function getTo() { return to; };
      answer.getCorrect = function getCorrect() { return correct; };
      return answer;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.TimeChoice', net.riemschneider.history.model.TimeChoice);
}());
