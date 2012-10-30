var Difficulty = net.riemschneider.history.model.Difficulty;
var Question = net.riemschneider.history.model.Question;
var Answer = net.riemschneider.history.model.Answer;

TestCase('QuestionTest', {
  testCreateAndGetters: function () {
    var answer = Answer.create(0);
    var question = Question.create('ID', Difficulty.EASY, 'question?', answer);
    assertNotNull(question);
    assertEquals('ID', question.getId());
    assertSame(Difficulty.EASY, question.getDifficulty());
    assertEquals('question?', question.getText());
    assertSame(answer, question.getAnswer());
  },

  testNullAndTypeSafe: function () {
    var answer = Answer.create(0);
    assertException(function () { Question.create('ID', Difficulty.EASY, 'question?', null); }, 'TypeError');
    assertException(function () { Question.create('ID', Difficulty.EASY, null, answer); }, 'TypeError');
    assertException(function () { Question.create('ID', null, 'question?', answer); }, 'TypeError');
    assertException(function () { Question.create(null, Difficulty.EASY, 'question?', answer); }, 'TypeError');

    assertException(function () { Question.create('ID', Difficulty.EASY, 90, answer); }, 'TypeError');
    assertException(function () { Question.create('ID', 5, 'question?', answer); }, 'TypeError');
    assertException(function () { Question.create(5, Difficulty.EASY, 'question?', answer); }, 'TypeError');
  },

  testCreateFromState: function () {
    Answer.registerStateReader('answer', function (state) { return Answer.create(state.time); });
    var answer = { type: 'answer', time: 5 };
    var question = Question.createFromState({ id: 'ID', difficulty: 'EASY', text: 'question?', answer: answer });
    assertNotNull(question);
    assertEquals('ID', question.getId());
    assertSame(Difficulty.EASY, question.getDifficulty());
    assertEquals('question?', question.getText());
    assertSame(5, question.getAnswer().getTime());
  },

  testCreateFromStateNullAndTypeSafe: function () {
    Answer.registerStateReader('answer', function (state) { return Answer.create(state.time); });
    var answer = { type: 'answer', time: 5 };
    var text = 'question?';

    assertException(function () { Question.createFromState(null); }, 'TypeError');
    assertException(function () { Question.createFromState({ id: 'ID', difficulty: 'EASY', text: text }); }, 'TypeError');
    assertException(function () { Question.createFromState({ id: 'ID', difficulty: 'EASY', answer: answer }); }, 'TypeError');
    assertException(function () { Question.createFromState({ id: 'ID', text: text, answer: answer }); }, 'TypeError');
    assertException(function () { Question.createFromState({ difficulty: 'EASY', text: text, answer: answer }); }, 'TypeError');

    assertException(function () { Question.createFromState({ id: 'ID', difficulty: 'EASY', text: 90, answer: answer }); }, 'TypeError');
    assertException(function () { Question.createFromState({ id: 'ID', difficulty: 90, text: text, answer: answer }); }, 'TypeError');
    assertException(function () { Question.createFromState({ id: 'ID', difficulty: 'BOGUS', text: text, answer: answer }); }, 'TypeError');
    assertException(function () { Question.createFromState({ id: 90, difficulty: 'EASY', text: text, answer: answer }); }, 'TypeError');
  }
});
