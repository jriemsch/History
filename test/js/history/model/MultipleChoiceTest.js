var Answer = net.riemschneider.history.model.Answer;
var MultipleChoices = net.riemschneider.history.model.MultipleChoices;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('MultipleChoicesTest', {
  testCreateAndGetters: function () {
    var choices = ['answer1', 'answer2'];
    var answer = MultipleChoices.create(5, choices);
    assertNotNull(answer);
    assertTrue(TypeUtils.isOfType(answer, Answer));
    assertTrue(TypeUtils.isOfType(answer, MultipleChoices));
    assertEquals(5, answer.getTime());
    assertSame(choices, answer.getChoices());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { MultipleChoices.create(5, null); }, 'TypeError');
    assertException(function () { MultipleChoices.create(null, ['answer']); }, 'TypeError');
    assertException(function () { MultipleChoices.create(5, []); }, 'TypeError');
    assertException(function () { MultipleChoices.create(5, [5, 6]); }, 'TypeError');
  }
});
