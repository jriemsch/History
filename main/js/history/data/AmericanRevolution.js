net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var Topic = net.riemschneider.history.model.Topic;
  var AddOns = net.riemschneider.history.model.AddOns;

  net.riemschneider.history.data.AmericanRevolution = {
    init: function init(topics, questionsByTopicAndFact, addOns) {
      ArgumentUtils.assertArray(topics);
      ArgumentUtils.assertMap(questionsByTopicAndFact);
      ArgumentUtils.assertType(addOns, AddOns);

      var topicId = 'AMERICAN_REVOLUTION';
      topics.push(Topic.create(topicId, 'Amerikanische Revolution', 'images/americanRevolution.png'));

      questionsByTopicAndFact[topicId] = {};
    }
  };
}());