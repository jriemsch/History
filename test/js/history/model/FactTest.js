var Fact = net.riemschneider.history.model.Fact;
var TypeUtils = net.riemschneider.utils.TypeUtils;
var Difficulty = net.riemschneider.history.model.Difficulty;
var Question = net.riemschneider.history.model.Question;

TestCase('FactTest', {
  testCreate: function () {
    var question1 = Question.create('Q1', Difficulty.EASY, 'question?', Answer.create(0));
    var question2 = Question.create('Q2', Difficulty.MEDIUM, 'question?', Answer.create(0));
    var question3 = Question.create('Q3', Difficulty.MEDIUM, 'question?', Answer.create(0));
    var questions = [question1, question2, question3];
    var fact = Fact.create(questions);

    assertTrue(TypeUtils.isOfType(fact, Fact));
    assertSame(questions, fact.getQuestions());

    assertEquals(1, fact.getQuestionsOfDifficulty(Difficulty.EASY).length);
    assertEquals('Q1', fact.getQuestionsOfDifficulty(Difficulty.EASY)[0].getId());

    assertEquals(2, fact.getQuestionsOfDifficulty(Difficulty.MEDIUM).length);
    assertEquals('Q2', fact.getQuestionsOfDifficulty(Difficulty.MEDIUM)[0].getId());
    assertEquals('Q3', fact.getQuestionsOfDifficulty(Difficulty.MEDIUM)[1].getId());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { Fact.create(null); }, 'TypeError');

    assertException(function () { Fact.create({}); }, 'TypeError');
    assertException(function () { Fact.create([{}]); }, 'TypeError');
  }
});