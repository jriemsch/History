net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ViewState = net.riemschneider.structures.ViewState;

  net.riemschneider.history.controller.QuizTopicState = {
    create: function create(stateMachine, topicSelection, quizGenerator, topicsById, addOns) {
      ArgumentUtils.assertNotNull(quizGenerator);
      ArgumentUtils.assertMap(topicsById, function (key, value) {
        ArgumentUtils.assertString(key);
        ArgumentUtils.assertType(value, net.riemschneider.history.model.Topic);
      });
      ArgumentUtils.assertType(addOns, net.riemschneider.history.model.AddOns);

      var state = ViewState.create(stateMachine, 'quizTopic', false, topicSelection);

      state.onConfigureView = function onConfigureView() {
        topicSelection.setTopicInfos(createTopicInfos());
        topicSelection.onBack(function onBackPressed() { stateMachine.transitionTo('menu'); });
      };

      function getSortedTopics() {
        var topics = [];
        for (var topicId in topicsById) {
          if (topicsById.hasOwnProperty(topicId)) {
            topics.push(topicsById[topicId]);
          }
        }
        topics.sort(compareTopics);
        return topics;
      }

      function compareTopics(topic1, topic2) {
        var unlocked1 = addOns.isUnlocked(topic1.getId()) ? 0 : 1;
        var unlocked2 = addOns.isUnlocked(topic2.getId()) ? 0 : 1;
        if (unlocked1 === unlocked2) {
          return topic1.getYear() - topic2.getYear();
        }
        return unlocked1 - unlocked2;
      }

      function createTopicInfos() {
        var topics = getSortedTopics();
        var topicInfos = [];
        for (var idx = 0, len = topics.length; idx < len; ++idx) {
          topicInfos[idx] = createTopicInfo(topics[idx]);
        }
        return topicInfos;
      }

      function createTopicInfo(topic) {
        return {
          image: topic.getImage(),
          name: topic.getName(),
          showLockOverlay: !addOns.isUnlocked(topic.getId()),
          callback: function onTopicSelected() {
            quizGenerator.setCurrentTopic(topic.getId());
            stateMachine.transitionTo('quizOpponent');
          }
        };
      }

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.QuizTopicState', net.riemschneider.history.controller.QuizTopicState);
}());