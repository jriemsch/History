var Answer = net.riemschneider.history.model.Answer;
var GapChoice = net.riemschneider.history.model.GapChoice;
var Gap = net.riemschneider.history.model.Gap;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('GapChoiceTest', {
  testCreateAndGetters: function () {
    var choices = ['choice1', 'choice2'];
    var gaps = { gap: Gap.create([ 'fill1', 'fill2' ], 1) };
    var gapChoice = GapChoice.create(5, choices, gaps);
    assertNotNull(gapChoice);
    assertTrue(TypeUtils.isOfType(gapChoice, Answer));
    assertTrue(TypeUtils.isOfType(gapChoice, GapChoice));
    assertEquals(5, gapChoice.getTime());
    assertSame(choices, gapChoice.getChoices());
    assertSame(gaps, gapChoice.getGaps());
  },

  testNullAndTypeSafe: function () {
    var choices = ['choice1', 'choice2'];
    var gaps = { gap: Gap.create([ 'fill1', 'fill2' ], 1) };

    assertException(function () { GapChoice.create(5, choices, null); }, 'TypeError');
    assertException(function () { GapChoice.create(5, null, gaps); }, 'TypeError');
    assertException(function () { GapChoice.create(null, choices, gaps); }, 'TypeError');

    assertException(function () { GapChoice.create(5, choices, []); }, 'TypeError');
    assertException(function () { GapChoice.create(5, choices, { gap: {} }); }, 'TypeError');
    assertException(function () { GapChoice.create(5, [1, 2], gaps); }, 'TypeError');
    assertException(function () { GapChoice.create(5, [], gaps); }, 'TypeError');
  }
});
