var SecondWorldWar = net.riemschneider.history.data.SecondWorldWar;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('SecondWorldWarTest', {
  testInit: function () {
    var topicsById = {};
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {} ;
    SecondWorldWar.init(topicsById, questionsByTopicAndFact, addOns, regionsByTopic);
    assertNotUndefined(topicsById.SECOND_WORLD_WAR);
    assertTrue(TypeUtils.isOfType(questionsByTopicAndFact.SECOND_WORLD_WAR, net.riemschneider.history.model.Facts));
    assertTrue(TypeUtils.isOfType(regionsByTopic.SECOND_WORLD_WAR, net.riemschneider.history.model.Regions));
    assertFalse(addOns.isUnlocked('SECOND_WORLD_WAR'));
  },

  testNullAndTypeSafe: function () {
    var topicsById = {};
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};

    assertException(function () { SecondWorldWar.init(topicsById, questionsByTopicAndFact, addOns, null); }, 'TypeError');
    assertException(function () { SecondWorldWar.init(topicsById, questionsByTopicAndFact, null, regionsByTopic); }, 'TypeError');
    assertException(function () { SecondWorldWar.init(topicsById, null, addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { SecondWorldWar.init(null, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');

    assertException(function () { SecondWorldWar.init(topicsById, questionsByTopicAndFact, addOns, []); }, 'TypeError');
    assertException(function () { SecondWorldWar.init(topicsById, questionsByTopicAndFact, {}, regionsByTopic); }, 'TypeError');
    assertException(function () { SecondWorldWar.init(topicsById, [], addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { SecondWorldWar.init([], questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');
  }
});