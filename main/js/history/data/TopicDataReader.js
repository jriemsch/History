net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var Topic = net.riemschneider.history.model.Topic;
  var AddOns = net.riemschneider.history.model.AddOns;
  var Regions = net.riemschneider.history.model.Regions;
  var Facts = net.riemschneider.history.model.Facts;
  var WebUtils = net.riemschneider.utils.WebUtils;

  net.riemschneider.history.data.TopicDataReader = {
    create: function create(topicsById, questionsByTopicAndFact, addOns, regionsByTopic) {
      ArgumentUtils.assertMap(topicsById);
      ArgumentUtils.assertMap(questionsByTopicAndFact);
      ArgumentUtils.assertType(addOns, AddOns);
      ArgumentUtils.assertMap(regionsByTopic);

      return {
        read: function read(file) {
          ArgumentUtils.assertString(file);

          WebUtils.getJson(file, parseTopicData);

          function parseTopicData(data) {
            var topic = Topic.createFromState(data.topic);
            var topicId = topic.getId();

            topicsById[topicId] = topic;
            regionsByTopic[topicId] = Regions.createFromState(data.regions);
            questionsByTopicAndFact[topicId] = Facts.createFromState(data.facts);

            if (data.unlocked) {
              addOns.unlock(topicId);
            }
          }
        }
      };
    }
  };
}());
