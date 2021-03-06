net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  "use strict";

  var DecoratedImageMap = net.riemschneider.history.views.components.DecoratedImageMap;
  var QuizPlayers = net.riemschneider.history.views.components.QuizPlayers;
  var Difficulty = net.riemschneider.history.model.Difficulty;
  var RegionState = net.riemschneider.history.views.components.RegionState;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ObservedProperty = net.riemschneider.utils.ObservedProperty;

  var scoreByDifficulty = {};
  scoreByDifficulty[Difficulty.EASY.key] = 5;
  scoreByDifficulty[Difficulty.MEDIUM.key] = 10;
  scoreByDifficulty[Difficulty.HARD.key] = 20;

  var difficultyClasses = {};
  difficultyClasses[Difficulty.EASY.key] = 'quizDifficultyEasy';
  difficultyClasses[Difficulty.MEDIUM.key] = 'quizDifficultyMedium';
  difficultyClasses[Difficulty.HARD.key] = 'quizDifficultyHard';

  net.riemschneider.history.views.QuizView = {
    create: function (playerController, quizController, regionsByTopic, topicsById, answerComponentRegistry) {
      ArgumentUtils.assertNotNull(playerController);
      ArgumentUtils.assertNotNull(quizController);
      ArgumentUtils.assertMap(regionsByTopic);
      ArgumentUtils.assertMap(topicsById);
      ArgumentUtils.assertNotNull(answerComponentRegistry);
	
      var quizPlayers = null;
      var quizMapSelection = null;
      var onRegionSelectedCallback = null;
      var selectedRegionIdTopic = null;

      function onTapped(region) {
        if (onRegionSelectedCallback !== null) {
          quizMapSelection.flashRegion(region.getId());
          onRegionSelectedCallback(region);
        }
      }

      function onSelectedRegionChanged(regionId) {
        quizMapSelection.setRegionState(regionId, RegionState.SELECTED);
      }

      return {
        show: function show() {
          var quiz = quizController.getCurrentQuiz();
          var quizView = $('#quizView');
          var quizMap = quizView.find('.quizMap');
          var questionsByRegion = quiz.getQuestionsByRegion();
          var opponents = quiz.getOpponentPairing();
          var player = playerController.getPlayer();
          var players = [ player, opponents.first, opponents.second ];
          var topicId = quiz.getTopicId();
          var topic = topicsById[topicId];
          var regions = regionsByTopic[topicId];

          selectedRegionIdTopic = ObservedProperty.create(quiz, 'selectedRegionId', onSelectedRegionChanged);

          quizPlayers = QuizPlayers.create(quizView, players);

          quizMapSelection = DecoratedImageMap.create(quizMap, topic.getMapImgData());
          var regionArray = regions.getRegions();
          for (var idx = 0, len = regionArray.length; idx < len; ++idx) {
            addRegion(regionArray[idx]);
          }
          quizView.show();

          function addRegion(region) {
            var question = questionsByRegion[region.getId()];
            var difficulty = question.getDifficulty();
            var score = scoreByDifficulty[difficulty.key];
            var scoreClass = difficultyClasses[difficulty.key];
            quizMapSelection.addImage(region.getId(), region.getImgData(), region.getDifficultyPos(), score, scoreClass, function () {
              onTapped(region);
            });
          }
        },
        hide: function hide() {
          $('#quizView').hide();
          quizMapSelection.destroy();
          quizPlayers.destroy();
          selectedRegionIdTopic.destroy();
        },
        onRegionSelected: function onRegionSelected(callback) { onRegionSelectedCallback = callback; },
        showQuestion: function showQuestion(question) {
          ArgumentUtils.assertType(question, net.riemschneider.history.model.Question);

          var quizView = $('#quizView');
          var quizMap = quizView.find('.quizMap');
          var quizQuestionDiv = $('<div class="quizQuestion">' + question.getText() + '</div>');
          quizMap.append(quizQuestionDiv);
          var answer = question.getAnswer();
          var answerComponent = answerComponentRegistry.createAnswerComponent(answer);
          var fadeInElements = answerComponent.show(quizMap);
          fadeIn(quizQuestionDiv, 300);
          for (var idx = 0, len = fadeInElements.length; idx < len; ++idx) {
            fadeIn(fadeInElements[idx], 300 * (idx + 1));
          }

          function fadeIn(element, time) {
            setTimeout(function () { element.css({ opacity: 1 }); }, time);
          }
        }
      };
    }
  };
}());
