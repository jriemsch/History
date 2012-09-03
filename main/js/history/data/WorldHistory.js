net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var Topic = net.riemschneider.history.model.Topic;
  var AddOns = net.riemschneider.history.model.AddOns;

  net.riemschneider.history.data.WorldHistory = {
    init: function init(topics, questionsByTopicAndFact, addOns, regionsByTopic) {
      ArgumentUtils.assertArray(topics);
      ArgumentUtils.assertMap(questionsByTopicAndFact);
      ArgumentUtils.assertType(addOns, AddOns);
      ArgumentUtils.assertMap(regionsByTopic);

      var topicId = 'WORLD_HISTORY';
      topics.push(Topic.create(topicId, 'Weltgeschichte', 'images/worldHistory.png'));

      var regions = [];
      regionsByTopic[topicId] = regions;

      questionsByTopicAndFact[topicId] = {};
    }
  };
}());
