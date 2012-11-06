net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  "use strict";

  var QuizMapSelection = net.riemschneider.history.views.components.QuizMapSelection;
  var QuizPlayers = net.riemschneider.history.views.components.QuizPlayers;
  var Difficulty = net.riemschneider.history.model.Difficulty;

  var scoreByDifficulty = {};
  scoreByDifficulty[Difficulty.EASY.key] = 5;
  scoreByDifficulty[Difficulty.MEDIUM.key] = 10;
  scoreByDifficulty[Difficulty.HARD.key] = 20;

  net.riemschneider.history.views.QuizView = {
    create: function (playerController, quizController, regionsByTopic, topicsById) {
      var quizPlayers = null;
      var quizMapSelection = null;
      var onRegionSelectedCallback = null;

      function onTapped(region) {
        if (onRegionSelectedCallback !== null) {
          onRegionSelectedCallback(region);
        }
      }

      return {
        show: function show() {
          var quizView = $('#quizView');
          var quizMap = quizView.find('.quizMap');
          var quiz = quizController.getCurrentQuiz();
          var questionsByRegion = quiz.getQuestionsByRegion();
          var opponents = quiz.getOpponentPairing();
          var player = playerController.getPlayer();
          var players = [ player, opponents.first, opponents.second ];
          var topicId = quiz.getTopicId();
          var topic = topicsById[topicId];
          var regions = regionsByTopic[topicId];

          quizPlayers = QuizPlayers.create(quizView, players);

          quizMapSelection = QuizMapSelection.create(quizMap, topic, regions, questionsByRegion, scoreByDifficulty, onTapped);
          quizView.show();
        },
        hide: function hide() {
          $('#quizView').hide();
          quizMapSelection.destroy();
          quizPlayers.destroy();
        },
        onRegionSelected: function onRegionSelected(callback) { onRegionSelectedCallback = callback; }
      };
    }
  };
}());
