net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.controller.QuizTopicPresenter = {
    create: function create(quizGenerator, topicsById, addOns, templates) {
      ArgumentUtils.assertNotNull(quizGenerator);
      ArgumentUtils.assertMap(topicsById, function (key, value) {
        ArgumentUtils.assertString(key);
        ArgumentUtils.assertType(value, net.riemschneider.history.model.Topic);
      });
      ArgumentUtils.assertType(addOns, net.riemschneider.history.model.AddOns);
      ArgumentUtils.assertMap(templates);
      ArgumentUtils.assertType(templates.topicSelectionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.imageSelectionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.lockedTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.unlockedTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.backgroundImageTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.backgroundTemplate, net.riemschneider.ui.Template);

      var topicSelectionDiv = null;

      return {
        show: function show(onBack, onDone) {
          ArgumentUtils.assertFunction(onBack);
          ArgumentUtils.assertFunction(onDone);

          var viewData = {
            imageSelection: {
              template: templates.imageSelectionTemplate,
              options: createTopicInfos()
            },
            background: {
              template: templates.backgroundTemplate,
              imageTemplate: templates.backgroundImageTemplate,
              count: 3
            },
            onBackCallback: function () { onBack(); }
          };

          topicSelectionDiv = templates.topicSelectionTemplate.clone(viewData);
          $('body').append(topicSelectionDiv);

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
            var unlocked = addOns.isUnlocked(topic.getId());
            return {
              image: topic.getImage(),
              name: topic.getName(),
              showLockOverlay: !unlocked,
              template: unlocked ? templates.unlockedTemplate : templates.lockedTemplate,
              callback: function onTopicSelected() {
                quizGenerator.setCurrentTopic(topic.getId());
                onDone();
              }
            };
          }
        },

        hide: function hide() {
          topicSelectionDiv.remove();
        }
      };
    }
  };
}());
