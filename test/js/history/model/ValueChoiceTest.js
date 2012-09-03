var Answer = net.riemschneider.history.model.Answer;
var ValueChoice = net.riemschneider.history.model.ValueChoice;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('ValueChoiceTest', {
  testCreateAndGetters: function () {
    var answer = ValueChoice.create(5, 1, 3, 2, 'km');
    assertNotNull(answer);
    assertTrue(TypeUtils.isOfType(answer, Answer));
    assertTrue(TypeUtils.isOfType(answer, ValueChoice));
    assertEquals(5, answer.getTime());
    assertSame(1, answer.getFrom());
    assertSame(3, answer.getTo());
    assertSame(2, answer.getCorrect());
    assertEquals('km', answer.getUnit());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { ValueChoice.create(5, 1, 3, 3, null); }, 'TypeError');
    assertException(function () { ValueChoice.create(5, 1, 3, null, ''); }, 'TypeError');
    assertException(function () { ValueChoice.create(5, 1, null, 2, ''); }, 'TypeError');
    assertException(function () { ValueChoice.create(5, null, 3, 2, ''); }, 'TypeError');
    assertException(function () { ValueChoice.create(null, 1, 3, 2, ''); }, 'TypeError');

    assertException(function () { ValueChoice.create(5, 1, 3, 20, 2); }, 'TypeError');
    assertException(function () { ValueChoice.create(5, 1, 3, 20, ''); }, 'TypeError');
    assertException(function () { ValueChoice.create(5, 3, 3, 2, ''); }, 'TypeError');
  }
});
