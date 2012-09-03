var FirstWorldWar = net.riemschneider.history.data.FirstWorldWar;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('FirstWorldWarTest', {
  testInit: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};
    FirstWorldWar.init(topics, questionsByTopicAndFact, addOns, regionsByTopic);
    assertEquals(1, topics.length);
    assertNotUndefined(questionsByTopicAndFact.FIRST_WORLD_WAR);
    assertFalse(addOns.isUnlocked('FIRST_WORLD_WAR'));
    assertNotUndefined(regionsByTopic.FIRST_WORLD_WAR);
  },

  testNullAndTypeSafe: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};

    assertException(function () { FirstWorldWar.init(topics, questionsByTopicAndFact, addOns, null); }, 'TypeError');
    assertException(function () { FirstWorldWar.init(topics, questionsByTopicAndFact, null, regionsByTopic); }, 'TypeError');
    assertException(function () { FirstWorldWar.init(topics, null, addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { FirstWorldWar.init(null, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');

    assertException(function () { FirstWorldWar.init(topics, questionsByTopicAndFact, addOns, []); }, 'TypeError');
    assertException(function () { FirstWorldWar.init(topics, questionsByTopicAndFact, {}, regionsByTopic); }, 'TypeError');
    assertException(function () { FirstWorldWar.init(topics, [], addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { FirstWorldWar.init({}, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');
  }
});