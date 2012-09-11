net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var Quiz = net.riemschneider.history.model.Quiz;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ArrayUtils = net.riemschneider.utils.ArrayUtils;
  var Random = net.riemschneider.utils.Random;

  net.riemschneider.history.controller.QuizGenerator = {
    create: function create(regionsByTopic, questionListGenerator, questionDistribution) {
      ArgumentUtils.assertMap(regionsByTopic, function (key, regions) {
        ArgumentUtils.assertType(regions, net.riemschneider.history.model.Regions);
      });
      ArgumentUtils.assertType(questionDistribution, net.riemschneider.history.model.QuestionDistribution);

      var currentTopicId = null;
      var currentOpponentPairing = null;
      var currentDifficulty = null;

      function mapQuestions(regions, questions) {
        var questionsByRegion = {};
        var regionsArray = regions.getRegions();
        for (var idx = 0, len = regionsArray.length; idx < len; ++idx) {
          var regionId = regionsArray[idx].getId();
          var randomIdx = Math.floor(Random.next() * questions.length);
          var question = questions[randomIdx];
          ArrayUtils.removeElementAt(questions, randomIdx);
          questionsByRegion[regionId] = question;
        }
        return questionsByRegion;
      }

      return {
        setCurrentTopic: function setCurrentTopic(topicId) {
          ArgumentUtils.assertNotNull(regionsByTopic[topicId]);
          currentTopicId = topicId;
        },
        setCurrentOpponents: function setCurrentOpponents(opponentPairing) {
          ArgumentUtils.assertType(opponentPairing.first, net.riemschneider.history.model.Opponent);
          ArgumentUtils.assertType(opponentPairing.second, net.riemschneider.history.model.Opponent);
          currentOpponentPairing = opponentPairing;
        },
        setCurrentDifficulty: function setCurrentDifficulty(difficulty) {
          ArgumentUtils.assertType(difficulty, net.riemschneider.history.model.Difficulty);
          currentDifficulty = difficulty;
        },
        generate: function generate() {
          ArgumentUtils.assertNotNull(currentTopicId);
          ArgumentUtils.assertNotNull(currentDifficulty);
          ArgumentUtils.assertNotNull(currentOpponentPairing);

          var regions = regionsByTopic[currentTopicId];
          var distribution = questionDistribution.getDistribution(currentDifficulty);

          var questions = questionListGenerator.generate(currentTopicId, regions, distribution);
          var questionsByRegion = mapQuestions(regions, questions);

          return Quiz.create(currentTopicId, currentOpponentPairing, currentDifficulty, questionsByRegion);
        }
      };
    }
  };
}());
