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

    assertException(function () { Question.create('ID', 5, 'question?', answer); }, 'TypeError');
  }
});
