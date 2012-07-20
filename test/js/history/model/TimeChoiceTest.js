var Answer = net.riemschneider.history.model.Answer;
var TimeChoice = net.riemschneider.history.model.TimeChoice;
var DateSelector = net.riemschneider.history.model.DateSelector;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('TimeChoicesTest', {
  testCreateAndGetters: function () {
    var from = DateSelector.year(1);
    var to = DateSelector.year(3);
    var correct = DateSelector.year(2);
    var answer = TimeChoice.create(5, from, to, correct);
    assertNotNull(answer);
    assertTrue(TypeUtils.isOfType(answer, Answer));
    assertTrue(TypeUtils.isOfType(answer, TimeChoice));
    assertEquals(5, answer.getTime());
    assertSame(from, answer.getFrom());
    assertSame(to, answer.getTo());
    assertSame(correct, answer.getCorrect());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { TimeChoice.create(5, DateSelector.year(1), DateSelector.year(3), null); }, 'TypeError');
    assertException(function () { TimeChoice.create(5, DateSelector.year(1), null, DateSelector.year(2)); }, 'TypeError');
    assertException(function () { TimeChoice.create(5, null, DateSelector.year(3), DateSelector.year(2)); }, 'TypeError');
    assertException(function () { TimeChoice.create(null, DateSelector.year(1), DateSelector.year(3), DateSelector.year(2)); }, 'TypeError');

    assertException(function () { TimeChoice.create(5, DateSelector.year(1), DateSelector.year(3), DateSelector.month(1, 2)); }, 'TypeError');
    assertException(function () { TimeChoice.create(5, DateSelector.year(1), DateSelector.month(1, 3), DateSelector.year(2)); }, 'TypeError');
    assertException(function () { TimeChoice.create(5, DateSelector.month(1, 1), DateSelector.year(3), DateSelector.year(2)); }, 'TypeError');
    assertException(function () { TimeChoice.create(5, DateSelector.year(1), DateSelector.year(3), DateSelector.year(20)); }, 'TypeError');
    assertException(function () { TimeChoice.create(5, DateSelector.year(3), DateSelector.year(3), DateSelector.year(2)); }, 'TypeError');
  }
});
