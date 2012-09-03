var SecondWorldWar = net.riemschneider.history.data.SecondWorldWar;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('SecondWorldWarTest', {
  testInit: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {} ;
    SecondWorldWar.init(topics, questionsByTopicAndFact, addOns, regionsByTopic);
    assertEquals(1, topics.length);
    assertNotUndefined(questionsByTopicAndFact.SECOND_WORLD_WAR);
    assertFalse(addOns.isUnlocked('SECOND_WORLD_WAR'));
    assertNotUndefined(regionsByTopic.SECOND_WORLD_WAR);
  },

  testNullAndTypeSafe: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};

    assertException(function () { SecondWorldWar.init(topics, questionsByTopicAndFact, addOns, null); }, 'TypeError');
    assertException(function () { SecondWorldWar.init(topics, questionsByTopicAndFact, null, regionsByTopic); }, 'TypeError');
    assertException(function () { SecondWorldWar.init(topics, null, addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { SecondWorldWar.init(null, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');

    assertException(function () { SecondWorldWar.init(topics, questionsByTopicAndFact, addOns, []); }, 'TypeError');
    assertException(function () { SecondWorldWar.init(topics, questionsByTopicAndFact, {}, regionsByTopic); }, 'TypeError');
    assertException(function () { SecondWorldWar.init(topics, [], addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { SecondWorldWar.init({}, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');
  }
});