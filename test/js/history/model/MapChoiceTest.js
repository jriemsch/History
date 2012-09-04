var Answer = net.riemschneider.history.model.Answer;
var MapChoice = net.riemschneider.history.model.MapChoice;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('MapChoicesTest', {
  testCreateAndGetters: function () {
    var choices = ['answer1', 'answer2'];
    var correctOrder = [0, 1];
    var mappings = ['mapping1', 'mapping2'];
    var answer = MapChoice.create(5, choices, mappings, correctOrder);
    assertNotNull(answer);
    assertTrue(TypeUtils.isOfType(answer, Answer));
    assertTrue(TypeUtils.isOfType(answer, MapChoice));
    assertEquals(5, answer.getTime());
    assertSame(choices, answer.getChoices());
    assertEquals(correctOrder, answer.getCorrectOrder());
    assertEquals(mappings, answer.getMappings());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { MapChoice.create(5, [''], [''], null); }, 'TypeError');
    assertException(function () { MapChoice.create(5, [''], null, [0]); }, 'TypeError');
    assertException(function () { MapChoice.create(5, null, [''], [0]); }, 'TypeError');
    assertException(function () { MapChoice.create(null, [''], [''], [0]); }, 'TypeError');

    assertException(function () { MapChoice.create(5, [''], [''], 0); }, 'TypeError');
    assertException(function () { MapChoice.create(5, [''], [], [0]); }, 'TypeError');
    assertException(function () { MapChoice.create(5, [], [''], [0]); }, 'TypeError');
    assertException(function () { MapChoice.create(5, [''], [5, 6], [0]); }, 'TypeError');
    assertException(function () { MapChoice.create(5, [5, 6], [''], [0]); }, 'TypeError');
    assertException(function () { MapChoice.create(5, ['', ''], ['', ''], [0]); }, 'TypeError');
    assertException(function () { MapChoice.create(5, ['', ''], [''], [0, 1]); }, 'TypeError');
    assertException(function () { MapChoice.create(5, [''], [''], [1]); }, 'TypeError');
  }
});
