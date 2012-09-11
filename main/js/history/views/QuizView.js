net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  net.riemschneider.history.views.QuizView = {
    create: function (quizController) {
      return {
        show: function show() {
          $('#quizView').show();
        },
        hide: function hide() {
          $('#quizView').hide();
        }
      };
    }
  };
}());
