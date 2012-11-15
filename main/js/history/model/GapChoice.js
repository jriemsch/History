net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  "use strict";

  var Answer = net.riemschneider.history.model.Answer;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Gap = net.riemschneider.history.model.Gap;

  net.riemschneider.history.model.GapChoice = {
    create: function create(time, choices, gaps) {
      ArgumentUtils.assertArray(choices, function (elem) { ArgumentUtils.assertString(elem); });
      ArgumentUtils.assertTrue(choices.length > 0);
      ArgumentUtils.assertMap(gaps, function (key, value) {
        ArgumentUtils.assertType(value, Gap);
        ArgumentUtils.assertTrue(choices.length === value.getFillers().length);
      });

      var answer = Answer.create(time);
      answer.getChoices = function getChoices() { return choices; };
      answer.getGaps = function getGaps() { return gaps; };
      return answer;
    },

    createFromState: function createFromState(state) {
      ArgumentUtils.assertNotNull(state);
      ArgumentUtils.assertNotNull(state.gaps);
      var gaps = {};
      for (var gapKey in state.gaps) {
        if (state.gaps.hasOwnProperty(gapKey)) {
          var gapData = state.gaps[gapKey];
          gaps[gapKey] = Gap.create(gapData.fillers, gapData.correct);
        }
      }

      return net.riemschneider.history.model.GapChoice.create(state.time, state.choices, gaps);
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.GapChoice', net.riemschneider.history.model.GapChoice);

  Answer.registerStateReader('gapChoice', net.riemschneider.history.model.GapChoice.createFromState);
}());
