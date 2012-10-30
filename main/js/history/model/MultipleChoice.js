net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var Answer = net.riemschneider.history.model.Answer;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.MultipleChoice = {
    create: function create(time, choices, correctChoices) {
      ArgumentUtils.assertArray(choices, function (elem) { ArgumentUtils.assertString(elem); });
      ArgumentUtils.assertTrue(choices.length > 0);
      ArgumentUtils.assertArray(correctChoices, function (elem) { ArgumentUtils.assertRange(elem, 0, choices.length - 1); });

      var answer = Answer.create(time);
      answer.getChoices = function getChoices() { return choices; };
      answer.getCorrectChoices = function getCorrectChoices() { return correctChoices; };
      return answer;
    },

    createFromState: function createFromState(state) {
      ArgumentUtils.assertNotNull(state);
      return net.riemschneider.history.model.MultipleChoice.create(state.time, state.choices, state.correct);
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.MultipleChoice', net.riemschneider.history.model.MultipleChoice);

  Answer.registerStateReader('multipleChoice', net.riemschneider.history.model.MultipleChoice.createFromState);
}());
