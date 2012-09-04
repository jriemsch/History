net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var Quiz = net.riemschneider.history.model.Quiz;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.controller.QuizController = {
    create: function create(questionDistribution) {
      ArgumentUtils.assertType(questionDistribution, net.riemschneider.history.model.QuestionDistribution);

      var currentTopicId = null;
      var currentOpponentPairing = null;
      var currentDifficulty = null;

      return {
        setCurrentTopic: function setCurrentTopic(topicId) { currentTopicId = topicId; },
        setCurrentOpponents: function setCurrentOpponents(opponentPairing) { currentOpponentPairing = opponentPairing; },
        setCurrentDifficulty: function setCurrentDifficulty(difficulty) { currentDifficulty = difficulty; },
        createQuiz: function createQuiz() {
          var questionsByRegion = {};
          return Quiz.create(currentTopicId, currentOpponentPairing, currentDifficulty, questionsByRegion);
        }
      };
    }
  };
}());
