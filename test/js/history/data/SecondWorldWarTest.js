var SecondWorldWar = net.riemschneider.history.data.SecondWorldWar;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('SecondWorldWarTest', {
  testInit: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    SecondWorldWar.init(topics, questionsByTopicAndFact, addOns);
    assertEquals(1, topics.length);
    assertNotNull(0, questionsByTopicAndFact.SECOND_WORLD_WAR);
    assertFalse(addOns.isUnlocked('SECOND_WORLD_WAR'));
  },

  testNullAndTypeSafe: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();

    assertException(function () { SecondWorldWar.init(topics, questionsByTopicAndFact, null); }, 'TypeError');
    assertException(function () { SecondWorldWar.init(topics, null, addOns); }, 'TypeError');
    assertException(function () { SecondWorldWar.init(null, questionsByTopicAndFact, addOns); }, 'TypeError');
    assertException(function () { SecondWorldWar.init(topics, questionsByTopicAndFact, {}); }, 'TypeError');
    assertException(function () { SecondWorldWar.init(topics, [], addOns); }, 'TypeError');
    assertException(function () { SecondWorldWar.init({}, questionsByTopicAndFact, addOns); }, 'TypeError');
  }
});