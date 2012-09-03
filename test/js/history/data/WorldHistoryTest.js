var WorldHistory = net.riemschneider.history.data.WorldHistory;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('WorldHistoryTest', {
  testInit: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};
    WorldHistory.init(topics, questionsByTopicAndFact, addOns, regionsByTopic);
    assertEquals(1, topics.length);
    assertNotUndefined(questionsByTopicAndFact.WORLD_HISTORY);
    assertFalse(addOns.isUnlocked('WORLD_HISTORY'));
    assertNotUndefined(regionsByTopic.WORLD_HISTORY);
  },

  testNullAndTypeSafe: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};

    assertException(function () { WorldHistory.init(topics, questionsByTopicAndFact, addOns, null); }, 'TypeError');
    assertException(function () { WorldHistory.init(topics, questionsByTopicAndFact, null, regionsByTopic); }, 'TypeError');
    assertException(function () { WorldHistory.init(topics, null, addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { WorldHistory.init(null, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');

    assertException(function () { WorldHistory.init(topics, questionsByTopicAndFact, addOns, []); }, 'TypeError');
    assertException(function () { WorldHistory.init(topics, questionsByTopicAndFact, {}, regionsByTopic); }, 'TypeError');
    assertException(function () { WorldHistory.init(topics, [], addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { WorldHistory.init({}, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');
  }
});