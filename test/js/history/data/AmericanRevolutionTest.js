var AmericanRevolution = net.riemschneider.history.data.AmericanRevolution;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('AmericanRevolutionTest', {
  testInit: function () {
    var topicsById = {};
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};
    AmericanRevolution.init(topicsById, questionsByTopicAndFact, addOns, regionsByTopic);
    assertNotUndefined(topicsById.AMERICAN_REVOLUTION);
    assertTrue(TypeUtils.isOfType(questionsByTopicAndFact.AMERICAN_REVOLUTION, net.riemschneider.history.model.Facts));
    assertTrue(TypeUtils.isOfType(regionsByTopic.AMERICAN_REVOLUTION, net.riemschneider.history.model.Regions));
    assertFalse(addOns.isUnlocked('AMERICAN_REVOLUTION'));
  },

  testNullAndTypeSafe: function () {
    var topicsById = {};
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};

    assertException(function () { AmericanRevolution.init(topicsById, questionsByTopicAndFact, addOns, null); }, 'TypeError');
    assertException(function () { AmericanRevolution.init(topicsById, questionsByTopicAndFact, null, regionsByTopic); }, 'TypeError');
    assertException(function () { AmericanRevolution.init(topicsById, null, addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { AmericanRevolution.init(null, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');

    assertException(function () { AmericanRevolution.init(topicsById, questionsByTopicAndFact, addOns, []); }, 'TypeError');
    assertException(function () { AmericanRevolution.init(topicsById, questionsByTopicAndFact, {}, regionsByTopic); }, 'TypeError');
    assertException(function () { AmericanRevolution.init(topicsById, [], addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { AmericanRevolution.init([], questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');
  }
});