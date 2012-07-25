var FirstWorldWar = net.riemschneider.history.data.FirstWorldWar;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('FirstWorldWarTest', {
  testInit: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    FirstWorldWar.init(topics, questionsByTopicAndFact, addOns);
    assertEquals(1, topics.length);
    assertNotNull(0, questionsByTopicAndFact.FIRST_WORLD_WAR);
    assertFalse(addOns.isUnlocked('FIRST_WORLD_WAR'));
  },

  testNullAndTypeSafe: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();

    assertException(function () { FirstWorldWar.init(topics, questionsByTopicAndFact, null); }, 'TypeError');
    assertException(function () { FirstWorldWar.init(topics, null, addOns); }, 'TypeError');
    assertException(function () { FirstWorldWar.init(null, questionsByTopicAndFact, addOns); }, 'TypeError');
    assertException(function () { FirstWorldWar.init(topics, questionsByTopicAndFact, {}); }, 'TypeError');
    assertException(function () { FirstWorldWar.init(topics, [], addOns); }, 'TypeError');
    assertException(function () { FirstWorldWar.init({}, questionsByTopicAndFact, addOns); }, 'TypeError');
  }
});