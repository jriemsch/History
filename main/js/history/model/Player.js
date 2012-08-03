net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.Player = {
    create: function (name, avatarImageIdx) {
      ArgumentUtils.assertNotNull(name);
      ArgumentUtils.assertNotNull(avatarImageIdx);

      var statistics = {};

      return {
        getName: function getName() { return name; },
        setName: function setName(newName) {
          ArgumentUtils.assertNotNull(newName);
          name = newName;
        },

        getAvatarImageIdx: function getAvatarImageIdx() { return avatarImageIdx; },
        setAvatarImageIdx: function setAvatarImageIdx(newAvatarImageIdx) {
          ArgumentUtils.assertNotNull(newAvatarImageIdx);
          avatarImageIdx = newAvatarImageIdx;
        },

        addStatistics: function addStatistics(topic, result) {
          var resultsForTopic = statistics[topic] || [];
          resultsForTopic.push(result);
          statistics[topic] = resultsForTopic;
        },

        getStatistics: function getStatistics(topic) {
          return statistics[topic] || [];
        },

        getState: function getState() {
          return {
            name: name,
            avatarImageIdx: avatarImageIdx,
            statistics: statistics
          }
        },

        setState: function setState(newState) {
          ArgumentUtils.assertNotNull(newState);
          ArgumentUtils.assertNotNull(newState.name);
          ArgumentUtils.assertNotNull(newState.avatarImageIdx);
          ArgumentUtils.assertNotNull(newState.statistics);

          name = newState.name;
          avatarImageIdx = newState.avatarImageIdx;
          statistics = newState.statistics;
        }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Player', net.riemschneider.history.model.Player);
}());
