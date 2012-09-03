net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var Quiz = net.riemschneider.history.model.Quiz;

  net.riemschneider.history.controller.QuizController = {
    create: function create() {
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
