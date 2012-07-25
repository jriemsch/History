var AmericanRevolution = net.riemschneider.history.data.AmericanRevolution;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('AmericanRevolutionTest', {
  testInit: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    AmericanRevolution.init(topics, questionsByTopicAndFact, addOns);
    assertEquals(1, topics.length);
    assertNotNull(0, questionsByTopicAndFact.AMERICAN_REVOLUTION);
    assertFalse(addOns.isUnlocked('AMERICAN_REVOLUTION'));
  },

  testNullAndTypeSafe: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();

    assertException(function () { AmericanRevolution.init(topics, questionsByTopicAndFact, null); }, 'TypeError');
    assertException(function () { AmericanRevolution.init(topics, null, addOns); }, 'TypeError');
    assertException(function () { AmericanRevolution.init(null, questionsByTopicAndFact, addOns); }, 'TypeError');
    assertException(function () { AmericanRevolution.init(topics, questionsByTopicAndFact, {}); }, 'TypeError');
    assertException(function () { AmericanRevolution.init(topics, [], addOns); }, 'TypeError');
    assertException(function () { AmericanRevolution.init({}, questionsByTopicAndFact, addOns); }, 'TypeError');
  }
});