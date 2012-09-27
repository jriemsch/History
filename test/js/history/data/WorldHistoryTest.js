var WorldHistory = net.riemschneider.history.data.WorldHistory;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('WorldHistoryTest', {
  testInit: function () {
    var topicsById = {};
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};
    WorldHistory.init(topicsById, questionsByTopicAndFact, addOns, regionsByTopic);
    assertNotUndefined(topicsById.WORLD_HISTORY);
    assertTrue(TypeUtils.isOfType(questionsByTopicAndFact.WORLD_HISTORY, net.riemschneider.history.model.Facts));
    assertTrue(TypeUtils.isOfType(regionsByTopic.WORLD_HISTORY, net.riemschneider.history.model.Regions));
    assertFalse(addOns.isUnlocked('WORLD_HISTORY'));
  },

  testNullAndTypeSafe: function () {
    var topicsById = {};
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};

    assertException(function () { WorldHistory.init(topicsById, questionsByTopicAndFact, addOns, null); }, 'TypeError');
    assertException(function () { WorldHistory.init(topicsById, questionsByTopicAndFact, null, regionsByTopic); }, 'TypeError');
    assertException(function () { WorldHistory.init(topicsById, null, addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { WorldHistory.init(null, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');

    assertException(function () { WorldHistory.init(topicsById, questionsByTopicAndFact, addOns, []); }, 'TypeError');
    assertException(function () { WorldHistory.init(topicsById, questionsByTopicAndFact, {}, regionsByTopic); }, 'TypeError');
    assertException(function () { WorldHistory.init(topicsById, [], addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { WorldHistory.init([], questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');
  }
});