net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.model.Quiz = {
    create: function create(topicId, opponentPairing, difficulty, questionsByRegion) {
      ArgumentUtils.assertNotNull(opponentPairing);
      ArgumentUtils.assertString(topicId);
      ArgumentUtils.assertType(difficulty, net.riemschneider.history.model.Difficulty);
      ArgumentUtils.assertType(opponentPairing.first, net.riemschneider.history.model.Opponent);
      ArgumentUtils.assertType(opponentPairing.second, net.riemschneider.history.model.Opponent);
      ArgumentUtils.assertMap(questionsByRegion, function (key, value) {
        ArgumentUtils.assertString(key);
        ArgumentUtils.assertString(value);
      });

      return {
        getTopicId: function getTopicId() { return topicId },
        getOpponentPairing: function getOpponentPairing() { return opponentPairing; },
        getDifficulty: function getDifficulty() { return difficulty; },
        getQuestionsByRegion: function getQuestionsByRegion() { return questionsByRegion; }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Quiz', net.riemschneider.history.model.Quiz);
}());
