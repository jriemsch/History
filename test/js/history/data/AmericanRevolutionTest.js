var AmericanRevolution = net.riemschneider.history.data.AmericanRevolution;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('AmericanRevolutionTest', {
  testInit: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};
    AmericanRevolution.init(topics, questionsByTopicAndFact, addOns, regionsByTopic);
    assertEquals(1, topics.length);
    assertTrue(TypeUtils.isOfType(questionsByTopicAndFact.AMERICAN_REVOLUTION, net.riemschneider.history.model.Facts));
    assertTrue(TypeUtils.isOfType(regionsByTopic.AMERICAN_REVOLUTION, net.riemschneider.history.model.Regions));
    assertFalse(addOns.isUnlocked('AMERICAN_REVOLUTION'));
  },

  testNullAndTypeSafe: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};

    assertException(function () { AmericanRevolution.init(topics, questionsByTopicAndFact, addOns, null); }, 'TypeError');
    assertException(function () { AmericanRevolution.init(topics, questionsByTopicAndFact, null, regionsByTopic); }, 'TypeError');
    assertException(function () { AmericanRevolution.init(topics, null, addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { AmericanRevolution.init(null, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');

    assertException(function () { AmericanRevolution.init(topics, questionsByTopicAndFact, addOns, []); }, 'TypeError');
    assertException(function () { AmericanRevolution.init(topics, questionsByTopicAndFact, {}, regionsByTopic); }, 'TypeError');
    assertException(function () { AmericanRevolution.init(topics, [], addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { AmericanRevolution.init({}, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');
  }
});