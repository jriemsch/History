var Fact = net.riemschneider.history.model.Fact;
var Facts = net.riemschneider.history.model.Facts;
var TypeUtils = net.riemschneider.utils.TypeUtils;
var Difficulty = net.riemschneider.history.model.Difficulty;
var Question = net.riemschneider.history.model.Question;

TestCase('FactsTest', {
  testCreate: function () {
    var question1 = Question.create('Q1', Difficulty.EASY, 'question?', Answer.create(0));
    var question2 = Question.create('Q2', Difficulty.MEDIUM, 'question?', Answer.create(0));
    var question3 = Question.create('Q3', Difficulty.MEDIUM, 'question?', Answer.create(0));
    var fact1 = Fact.create([question1, question2]);
    var fact2 = Fact.create([question3]);
    var factsArray = [fact1, fact2];
    var facts = Facts.create(factsArray);

    assertTrue(TypeUtils.isOfType(facts, Facts));
    assertSame(factsArray, facts.getFacts());
    assertEquals(1, facts.getFactsOfDifficulty(Difficulty.EASY).length);
    assertSame(fact1, facts.getFactsOfDifficulty(Difficulty.EASY)[0]);

    assertEquals(2, facts.getFactsOfDifficulty(Difficulty.MEDIUM).length);
    assertSame(fact1, facts.getFactsOfDifficulty(Difficulty.MEDIUM)[0]);
    assertSame(fact2, facts.getFactsOfDifficulty(Difficulty.MEDIUM)[1]);
  },

  testNullAndTypeSafe: function () {
    assertException(function () { Facts.create(null); }, 'TypeError');

    assertException(function () { Facts.create({}); }, 'TypeError');
    assertException(function () { Facts.create([{}]); }, 'TypeError');
  }
});