var Answer = net.riemschneider.history.model.Answer;
var MultipleChoice = net.riemschneider.history.model.MultipleChoice;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('MultipleChoicesTest', {
  testCreateAndGetters: function () {
    var choices = ['answer1', 'answer2'];
    var correctChoices = [1];
    var answer = MultipleChoice.create(5, choices, correctChoices);
    assertNotNull(answer);
    assertTrue(TypeUtils.isOfType(answer, Answer));
    assertTrue(TypeUtils.isOfType(answer, MultipleChoice));
    assertEquals(5, answer.getTime());
    assertSame(choices, answer.getChoices());
    assertEquals(correctChoices, answer.getCorrectChoices());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { MultipleChoice.create(5, [''], null); }, 'TypeError');
    assertException(function () { MultipleChoice.create(5, null, [0]); }, 'TypeError');
    assertException(function () { MultipleChoice.create(null, [''], [0]); }, 'TypeError');

    assertException(function () { MultipleChoice.create(5, [], 0); }, 'TypeError');
    assertException(function () { MultipleChoice.create(5, [], [0]); }, 'TypeError');
    assertException(function () { MultipleChoice.create(5, [5, 6], [0]); }, 'TypeError');
    assertException(function () { MultipleChoice.create(5, [''], [1]); }, 'TypeError');
  }
});
