net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  "use strict";

  var Answer = net.riemschneider.history.model.Answer;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.ValueChoice = {
    create: function create(time, from, to, correct, unit) {
      ArgumentUtils.assertNumber(from);
      ArgumentUtils.assertNumber(to);
      ArgumentUtils.assertNumber(correct);
      ArgumentUtils.assertRange(to, from);
      ArgumentUtils.assertRange(correct, from, to);
      ArgumentUtils.assertString(unit);

      var answer = Answer.create(time);
      answer.getFrom = function getFrom() { return from; };
      answer.getTo = function getTo() { return to; };
      answer.getCorrect = function getCorrect() { return correct; };
      answer.getUnit = function getUnit() { return unit; };
      return answer;
    },

    createFromState: function createFromState(state) {
      return net.riemschneider.history.model.ValueChoice.create(state.time, state.from, state.to, state.correct, state.unit);
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.ValueChoice', net.riemschneider.history.model.ValueChoice);

  Answer.registerStateReader('valueChoice', net.riemschneider.history.model.ValueChoice.createFromState);
}());
