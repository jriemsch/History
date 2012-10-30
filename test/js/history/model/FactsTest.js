var Fact = net.riemschneider.history.model.Fact;
var Facts = net.riemschneider.history.model.Facts;
var TypeUtils = net.riemschneider.utils.TypeUtils;
var Difficulty = net.riemschneider.history.model.Difficulty;
var Question = net.riemschneider.history.model.Question;
var Answer = net.riemschneider.history.model.Answer;

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
  },

  testCreateFromState: function () {
    Answer.registerStateReader('answer', function (state) { return Answer.create(state.time); });
    var answer = { type: 'answer', time: 5 };

    var fact1 = [
      { id: 'Q1', difficulty: 'EASY', text: 'question?', answer: answer },
      { id: 'Q2', difficulty: 'MEDIUM', text: 'question?', answer: answer }
    ];
    var fact2 = [
      { id: 'Q3', difficulty: 'MEDIUM', text: 'question?', answer: answer }
    ];
    var facts = Facts.createFromState([ fact1, fact2 ]);

    assertTrue(TypeUtils.isOfType(facts, Facts));
    assertSame(2, facts.getFacts().length);
    assertEquals(1, facts.getFactsOfDifficulty(Difficulty.EASY).length);
    assertSame(2, facts.getFactsOfDifficulty(Difficulty.EASY)[0].getQuestions().length);
    assertSame('Q1', facts.getFactsOfDifficulty(Difficulty.EASY)[0].getQuestions()[0].getId());
    assertSame('Q2', facts.getFactsOfDifficulty(Difficulty.EASY)[0].getQuestions()[1].getId());

    assertEquals(2, facts.getFactsOfDifficulty(Difficulty.MEDIUM).length);
    assertSame(2, facts.getFactsOfDifficulty(Difficulty.MEDIUM)[0].getQuestions().length);
    assertSame('Q1', facts.getFactsOfDifficulty(Difficulty.MEDIUM)[0].getQuestions()[0].getId());
    assertSame('Q2', facts.getFactsOfDifficulty(Difficulty.MEDIUM)[0].getQuestions()[1].getId());
    assertSame(1, facts.getFactsOfDifficulty(Difficulty.MEDIUM)[1].getQuestions().length);
    assertSame('Q3', facts.getFactsOfDifficulty(Difficulty.MEDIUM)[1].getQuestions()[0].getId());
  },

  testCreateFromStateNullAndTypeSafe: function () {
    assertException(function () { Facts.createFromState(null); }, 'TypeError');

    assertException(function () { Facts.createFromState({}); }, 'TypeError');
  }
});