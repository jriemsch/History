var FirstWorldWar = net.riemschneider.history.data.FirstWorldWar;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('FirstWorldWarTest', {
  testInit: function () {
    var topicsById = {};
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};
    FirstWorldWar.init(topicsById, questionsByTopicAndFact, addOns, regionsByTopic);
    assertNotUndefined(topicsById.FIRST_WORLD_WAR);
    assertTrue(TypeUtils.isOfType(questionsByTopicAndFact.FIRST_WORLD_WAR, net.riemschneider.history.model.Facts));
    assertTrue(TypeUtils.isOfType(regionsByTopic.FIRST_WORLD_WAR, net.riemschneider.history.model.Regions));
    assertFalse(addOns.isUnlocked('FIRST_WORLD_WAR'));
  },

  testNullAndTypeSafe: function () {
    var topicsById = {};
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};

    assertException(function () { FirstWorldWar.init(topicsById, questionsByTopicAndFact, addOns, null); }, 'TypeError');
    assertException(function () { FirstWorldWar.init(topicsById, questionsByTopicAndFact, null, regionsByTopic); }, 'TypeError');
    assertException(function () { FirstWorldWar.init(topicsById, null, addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { FirstWorldWar.init(null, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');

    assertException(function () { FirstWorldWar.init(topicsById, questionsByTopicAndFact, addOns, []); }, 'TypeError');
    assertException(function () { FirstWorldWar.init(topicsById, questionsByTopicAndFact, {}, regionsByTopic); }, 'TypeError');
    assertException(function () { FirstWorldWar.init(topicsById, [], addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { FirstWorldWar.init([], questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');
  }
});