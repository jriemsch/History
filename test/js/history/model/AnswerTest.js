var Answer = net.riemschneider.history.model.Answer;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('AnswerTest', {
  testCreateAndGetters: function () {
    var answer = Answer.create(5);
    assertNotNull(answer);
    assertTrue(TypeUtils.isOfType(answer, Answer));
    assertEquals(5, answer.getTime());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { Answer.create(null); }, 'TypeError');
    assertException(function () { Answer.create(-1); }, 'TypeError');
  }
});
