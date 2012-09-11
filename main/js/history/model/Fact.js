net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ArrayUtils = net.riemschneider.utils.ArrayUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Difficulty = net.riemschneider.history.model.Difficulty;

  net.riemschneider.history.model.Fact = {
    create: function (questions) {
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
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Fact', net.riemschneider.history.model.Fact);
}());
