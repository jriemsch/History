net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var Topic = net.riemschneider.history.model.Topic;
  var Regions = net.riemschneider.history.model.Regions;
  var Facts = net.riemschneider.history.model.Facts;
  var WebUtils = net.riemschneider.utils.WebUtils;

  net.riemschneider.history.data.TopicDataReader = {
    create: function create() {
      return {
        read: function read(file, addTopic, onDone) {
          ArgumentUtils.assertString(file);
          ArgumentUtils.assertFunction(addTopic);
          ArgumentUtils.assertFunction(onDone);

          WebUtils.getJson(file, parseTopicData);

          function parseTopicData(data) {
            var topic = Topic.createFromState(data.topic);
            var regions = Regions.createFromState(data.regions);
            var facts = Facts.createFromState(data.facts);
            addTopic(topic, regions, facts, data.unlocked);
            onDone();
          }
        }
      };
    }
  };
}());
