net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  "use strict";

  var Answer = net.riemschneider.history.model.Answer;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.OrderChoice = {
    create: function create(time, choices, correct) {
      ArgumentUtils.assertArray(choices, function (elem) { ArgumentUtils.assertString(elem); });
      ArgumentUtils.assertTrue(choices.length > 0);
      ArgumentUtils.assertArray(correct, function (elem) { ArgumentUtils.assertRange(elem, 0, choices.length - 1); });
      ArgumentUtils.assertTrue(correct.length === choices.length);

      var answer = Answer.create(time);
      answer.getChoices = function getChoices() { return choices; };
      answer.getCorrect = function getCorrect() { return correct; };
      return answer;
    },

    createFromState: function createFromState(state) {
      ArgumentUtils.assertNotNull(state);
      return net.riemschneider.history.model.OrderChoice.create(state.time, state.choices, state.correct);
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.OrderChoice', net.riemschneider.history.model.OrderChoice);

  Answer.registerStateReader('orderChoice', net.riemschneider.history.model.OrderChoice.createFromState);
}());
