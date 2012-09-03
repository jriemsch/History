net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var Topic = net.riemschneider.history.model.Topic;
  var AddOns = net.riemschneider.history.model.AddOns;

  net.riemschneider.history.data.FirstWorldWar = {
    init: function init(topics, questionsByTopicAndFact, addOns, regionsByTopic) {
      ArgumentUtils.assertArray(topics);
      ArgumentUtils.assertMap(questionsByTopicAndFact);
      ArgumentUtils.assertType(addOns, AddOns);
      ArgumentUtils.assertMap(regionsByTopic);

      var topicId = 'FIRST_WORLD_WAR';
      topics.push(Topic.create(topicId, 'Erster Weltkrieg', 'images/firstWorldWar.png'));

      var regions = [];
      regionsByTopic[topicId] = regions;

      questionsByTopicAndFact[topicId] = {};
    }
  };
}());
