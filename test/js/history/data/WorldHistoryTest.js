var WorldHistory = net.riemschneider.history.data.WorldHistory;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('WorldHistoryTest', {
  testInit: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    WorldHistory.init(topics, questionsByTopicAndFact, addOns);
    assertEquals(1, topics.length);
    assertNotNull(0, questionsByTopicAndFact.WORLD_HISTORY);
    assertFalse(addOns.isUnlocked('WORLD_HISTORY'));
  },

  testNullAndTypeSafe: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();

    assertException(function () { WorldHistory.init(topics, questionsByTopicAndFact, null); }, 'TypeError');
    assertException(function () { WorldHistory.init(topics, null, addOns); }, 'TypeError');
    assertException(function () { WorldHistory.init(null, questionsByTopicAndFact, addOns); }, 'TypeError');
    assertException(function () { WorldHistory.init(topics, questionsByTopicAndFact, {}); }, 'TypeError');
    assertException(function () { WorldHistory.init(topics, [], addOns); }, 'TypeError');
    assertException(function () { WorldHistory.init({}, questionsByTopicAndFact, addOns); }, 'TypeError');
  }
});