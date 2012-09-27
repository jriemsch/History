net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var Topic = net.riemschneider.history.model.Topic;
  var AddOns = net.riemschneider.history.model.AddOns;
  var Facts = net.riemschneider.history.model.Facts;
  var Regions = net.riemschneider.history.model.Regions;

  net.riemschneider.history.data.WorldHistory = {
    init: function init(topicsById, questionsByTopicAndFact, addOns, regionsByTopic) {
      ArgumentUtils.assertMap(topicsById);
      ArgumentUtils.assertMap(questionsByTopicAndFact);
      ArgumentUtils.assertType(addOns, AddOns);
      ArgumentUtils.assertMap(regionsByTopic);

      var topicId = 'WORLD_HISTORY';
      topicsById[topicId] = Topic.create(topicId, 'Weltgeschichte', 'images/worldHistory.png', '');

      regionsByTopic[topicId] = Regions.create([]);

      questionsByTopicAndFact[topicId] = Facts.create([]);
    }
  };
}());
