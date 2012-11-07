net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var Observer = net.riemschneider.utils.Observer;

  net.riemschneider.history.model.Quiz = {
    create: function create(topicId, opponentPairing, difficulty, questionsByRegion) {
      ArgumentUtils.assertNotNull(opponentPairing);
      ArgumentUtils.assertString(topicId);
      ArgumentUtils.assertType(difficulty, net.riemschneider.history.model.Difficulty);
      ArgumentUtils.assertType(opponentPairing.first, net.riemschneider.history.model.Opponent);
      ArgumentUtils.assertType(opponentPairing.second, net.riemschneider.history.model.Opponent);
      ArgumentUtils.assertMap(questionsByRegion, function (key, value) {
        ArgumentUtils.assertString(key);
        ArgumentUtils.assertType(value, net.riemschneider.history.model.Question);
      });

      var selectedRegionIdTopic = Observer.createTopic();
      var selectedRegionId = null;

      return {
        getTopicId: function getTopicId() { return topicId; },
        getOpponentPairing: function getOpponentPairing() { return opponentPairing; },
        getDifficulty: function getDifficulty() { return difficulty; },
        getQuestionsByRegion: function getQuestionsByRegion() { return questionsByRegion; },
        setSelectedRegionId: function setSelectedRegionId(regionId) {
          ArgumentUtils.assertString(regionId);
          ArgumentUtils.assertNotNull(questionsByRegion[regionId]);
          selectedRegionId = regionId;
          selectedRegionIdTopic.notify(selectedRegionId);
        },
        getSelectedRegionId: function getSelectedRegionId() { return selectedRegionId; },
        getSelectedRegionIdTopic: function getSelectedRegionIdTopic() { return selectedRegionIdTopic; }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Quiz', net.riemschneider.history.model.Quiz);
}());
