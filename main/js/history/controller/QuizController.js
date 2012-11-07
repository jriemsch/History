net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.controller.QuizController = {
    create: function create() {
      var currentQuiz = null;

      return {
        setCurrentQuiz: function setCurrentQuiz(quiz) {
          ArgumentUtils.assertType(quiz, net.riemschneider.history.model.Quiz);
          currentQuiz = quiz;
        },

        getCurrentQuiz: function getCurrentQuiz() { return currentQuiz; }
      };
    }
  };
}());
