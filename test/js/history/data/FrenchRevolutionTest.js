var FrenchRevolution = net.riemschneider.history.data.FrenchRevolution;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('FrenchRevolutionTest', {
  testInit: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};
    FrenchRevolution.init(topics, questionsByTopicAndFact, addOns, regionsByTopic);
    assertEquals(1, topics.length);
    assertTrue(TypeUtils.isOfType(questionsByTopicAndFact.FRENCH_REVOLUTION, net.riemschneider.history.model.Facts));
    assertTrue(TypeUtils.isOfType(regionsByTopic.FRENCH_REVOLUTION, net.riemschneider.history.model.Regions));
    assertTrue(addOns.isUnlocked('FRENCH_REVOLUTION'));
  },

  testNullAndTypeSafe: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};

    assertException(function () { FrenchRevolution.init(topics, questionsByTopicAndFact, addOns, null); }, 'TypeError');
    assertException(function () { FrenchRevolution.init(topics, questionsByTopicAndFact, null, regionsByTopic); }, 'TypeError');
    assertException(function () { FrenchRevolution.init(topics, null, addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { FrenchRevolution.init(null, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');

    assertException(function () { FrenchRevolution.init(topics, questionsByTopicAndFact, addOns, []); }, 'TypeError');
    assertException(function () { FrenchRevolution.init(topics, questionsByTopicAndFact, {}, regionsByTopic); }, 'TypeError');
    assertException(function () { FrenchRevolution.init(topics, [], addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { FrenchRevolution.init({}, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');
  }
});