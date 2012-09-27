var FrenchRevolution = net.riemschneider.history.data.FrenchRevolution;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('FrenchRevolutionTest', {
  testInit: function () {
    var topicsById = {};
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};
    FrenchRevolution.init(topicsById, questionsByTopicAndFact, addOns, regionsByTopic);
    assertNotUndefined(topicsById.FRENCH_REVOLUTION);
    assertTrue(TypeUtils.isOfType(questionsByTopicAndFact.FRENCH_REVOLUTION, net.riemschneider.history.model.Facts));
    assertTrue(TypeUtils.isOfType(regionsByTopic.FRENCH_REVOLUTION, net.riemschneider.history.model.Regions));
    assertTrue(addOns.isUnlocked('FRENCH_REVOLUTION'));
  },

  testNullAndTypeSafe: function () {
    var topicsById = {};
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};

    assertException(function () { FrenchRevolution.init(topicsById, questionsByTopicAndFact, addOns, null); }, 'TypeError');
    assertException(function () { FrenchRevolution.init(topicsById, questionsByTopicAndFact, null, regionsByTopic); }, 'TypeError');
    assertException(function () { FrenchRevolution.init(topicsById, null, addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { FrenchRevolution.init(null, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');

    assertException(function () { FrenchRevolution.init(topicsById, questionsByTopicAndFact, addOns, []); }, 'TypeError');
    assertException(function () { FrenchRevolution.init(topicsById, questionsByTopicAndFact, {}, regionsByTopic); }, 'TypeError');
    assertException(function () { FrenchRevolution.init(topicsById, [], addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { FrenchRevolution.init([], questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');
  }
});