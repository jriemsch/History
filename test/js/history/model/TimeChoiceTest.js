var Answer = net.riemschneider.history.model.Answer;
var TimeChoice = net.riemschneider.history.model.TimeChoice;
var DateSelector = net.riemschneider.history.model.DateSelector;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('TimeChoiceTest', {
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
  },

  testCreateFromState: function () {
    var from = '1.1.1780';
    var to = '31.12.1810';
    var correct = '17.6.1789';
    var answer = TimeChoice.createFromState({ time: 5, from: from, to: to, correct: correct });
    assertNotNull(answer);
    assertTrue(TypeUtils.isOfType(answer, Answer));
    assertTrue(TypeUtils.isOfType(answer, TimeChoice));
    assertEquals(5, answer.getTime());
    assertTrue(DateSelector.day(1, 1, 1780).equals(answer.getFrom()));
    assertTrue(DateSelector.day(31, 12, 1810).equals(answer.getTo()));
    assertTrue(DateSelector.day(17, 6, 1789).equals(answer.getCorrect()));
  },

  testCreateFromStateNullAndTypeSafe: function () {
    var from = '1.1.1780';
    var to = '31.12.1810';
    var correct = '17.6.1789';

    assertException(function () { TimeChoice.createFromState(null); }, 'TypeError');

    assertException(function () { TimeChoice.createFromState({ time: 5, from: from, to: to }); }, 'TypeError');
    assertException(function () { TimeChoice.createFromState({ time: 5, from: from, correct: correct }); }, 'TypeError');
    assertException(function () { TimeChoice.createFromState({ time: 5, to: to, correct: correct }); }, 'TypeError');
    assertException(function () { TimeChoice.createFromState({ from: from, to: to, correct: correct }); }, 'TypeError');

    assertException(function () { TimeChoice.createFromState({ time: 5, from: from, to: to, correct: 1900 }); }, 'TypeError');
    assertException(function () { TimeChoice.createFromState({ time: 5, from: from, to: 1900, correct: correct }); }, 'TypeError');
    assertException(function () { TimeChoice.createFromState({ time: 5, from: 1900, to: to, correct: correct }); }, 'TypeError');
    assertException(function () { TimeChoice.createFromState({ time: '5', from: from, to: to, correct: correct }); }, 'TypeError');

    assertException(function () { TimeChoice.createFromState({ time: 5, from: from, to: to, correct: '1.1.1811' }); }, 'TypeError');
    assertException(function () { TimeChoice.createFromState({ time: 5, from: from, to: '31.12.1779', correct: '1.1.1780' }); }, 'TypeError');
  }
});
