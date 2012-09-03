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
    assertEquals(2, questionsByTopicAndFact.FRENCH_REVOLUTION.FACT0.length);
    assertTrue(addOns.isUnlocked('FRENCH_REVOLUTION'));
    assertEquals(1, regionsByTopic.FRENCH_REVOLUTION.length);
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