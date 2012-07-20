var Answer = net.riemschneider.history.model.Answer;
var OrderChoice = net.riemschneider.history.model.OrderChoice;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('OrderChoicesTest', {
  testCreateAndGetters: function () {
    var choices = ['answer1', 'answer2'];
    var correctOrder = [1];
    var answer = OrderChoice.create(5, choices, correctOrder);
    assertNotNull(answer);
    assertTrue(TypeUtils.isOfType(answer, Answer));
    assertTrue(TypeUtils.isOfType(answer, OrderChoice));
    assertEquals(5, answer.getTime());
    assertSame(choices, answer.getChoices());
    assertEquals(correctOrder, answer.getCorrectOrder());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { OrderChoice.create(5, [''], null); }, 'TypeError');
    assertException(function () { OrderChoice.create(5, null, [0]); }, 'TypeError');
    assertException(function () { OrderChoice.create(null, [''], [0]); }, 'TypeError');

    assertException(function () { OrderChoice.create(5, [], 0); }, 'TypeError');
    assertException(function () { OrderChoice.create(5, [], [0]); }, 'TypeError');
    assertException(function () { OrderChoice.create(5, [5, 6], [0]); }, 'TypeError');
    assertException(function () { OrderChoice.create(5, [''], [1]); }, 'TypeError');
  }
});
