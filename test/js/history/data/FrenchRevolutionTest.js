var FrenchRevolution = net.riemschneider.history.data.FrenchRevolution;

TestCase('FrenchRevolutionTest', {
  testInit: function () {
    var topics = [];
    var questionsByTopicAndFact = {};
    FrenchRevolution.init(topics, questionsByTopicAndFact);
    assertEquals(1, topics.length);
    assertEquals(4, questionsByTopicAndFact.FRENCH_REVOLUTION.FACT0.length);
  }
});