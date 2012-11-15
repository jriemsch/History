net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ArrayUtils = net.riemschneider.utils.ArrayUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Difficulty = net.riemschneider.history.model.Difficulty;
  var Question = net.riemschneider.history.model.Question;

  net.riemschneider.history.model.Fact = {
    create: function create(questions) {
      ArgumentUtils.assertArray(questions, function (elem) {
        ArgumentUtils.assertType(elem, net.riemschneider.history.model.Question);
      });

      var questionByDifficulty = {};
      for (var idx = 0, len = Difficulty.values.length; idx < len; ++idx) {
        var difficulty = Difficulty.values[idx];
        questionByDifficulty[difficulty.key] = filterQuestions(difficulty);
      }

      function filterQuestions(difficulty) {
        return ArrayUtils.filter(questions, function (question) { return question.getDifficulty() === difficulty; });
      }

      return {
        getQuestions: function getQuestions() { return questions; },
        getQuestionsOfDifficulty: function getQuestionsOfDifficulty(difficulty) { return questionByDifficulty[difficulty.key]; }
      };
    },

    createFromState: function createFromState(state) {
      ArgumentUtils.assertArray(state);
      var questions = [];
      for (var idx = 0, len = state.length; idx < len; ++idx) {
        questions.push(Question.createFromState(state[idx]));
      }
      return net.riemschneider.history.model.Fact.create(questions);
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Fact', net.riemschneider.history.model.Fact);
}());
