var FrenchRevolution = net.riemschneider.history.data.FrenchRevolution;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('FrenchRevolutionTest', {
  testInit: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    FrenchRevolution.init(topics, questionsByTopicAndFact, addOns);
    assertEquals(1, topics.length);
    assertEquals(2, questionsByTopicAndFact.FRENCH_REVOLUTION.FACT0.length);
    assertTrue(addOns.isUnlocked('FRENCH_REVOLUTION'));
  },

  testNullAndTypeSafe: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();

    assertException(function () { FrenchRevolution.init(topics, questionsByTopicAndFact, null); }, 'TypeError');
    assertException(function () { FrenchRevolution.init(topics, null, addOns); }, 'TypeError');
    assertException(function () { FrenchRevolution.init(null, questionsByTopicAndFact, addOns); }, 'TypeError');
    assertException(function () { FrenchRevolution.init(topics, questionsByTopicAndFact, {}); }, 'TypeError');
    assertException(function () { FrenchRevolution.init(topics, [], addOns); }, 'TypeError');
    assertException(function () { FrenchRevolution.init({}, questionsByTopicAndFact, addOns); }, 'TypeError');
  }
});