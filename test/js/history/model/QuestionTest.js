var Question = net.riemschneider.history.model.Question;
var Answer = net.riemschneider.history.model.Answer;

TestCase('QuestionTest', {
  testCreateAndGetters: function () {
    var answer = Answer.create(0);
    var question = Question.create('ID', Question.DIFFICULTY.EASY, 'question?', answer);
    assertNotNull(question);
    assertEquals('ID', question.getId());
    assertEquals(Question.DIFFICULTY.EASY, question.getDifficulty());
    assertEquals('question?', question.getText());
    assertSame(answer, question.getAnswer());
  },

  testNullAndTypeSafe: function () {
    var answer = Answer.create(0);
    assertException(function () { Question.create('ID', Question.DIFFICULTY.EASY, 'question?', null); }, 'TypeError');
    assertException(function () { Question.create('ID', Question.DIFFICULTY.EASY, null, answer); }, 'TypeError');
    assertException(function () { Question.create('ID', null, 'question?', answer); }, 'TypeError');
    assertException(function () { Question.create(null, Question.DIFFICULTY.EASY, 'question?', answer); }, 'TypeError');

    assertException(function () { Question.create('ID', 5, 'question?', answer); }, 'TypeError');
  }
});
