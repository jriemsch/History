var Gap = net.riemschneider.history.model.Gap;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('GapTest', {
  testCreateAndGetters: function () {
    var fillers = ['fill1', 'fill2'];
    var gap = Gap.create(fillers, 1);
    assertNotNull(gap);
    assertTrue(TypeUtils.isOfType(gap, Gap));
    assertSame(fillers, gap.getFillers());
    assertEquals(1, gap.getCorrectChoice());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { Gap.create([''], null); }, 'TypeError');
    assertException(function () { Gap.create(null, 0); }, 'TypeError');

    assertException(function () { Gap.create([''], '0'); }, 'TypeError');
    assertException(function () { Gap.create([], 0); }, 'TypeError');
    assertException(function () { Gap.create([5, 6], 0); }, 'TypeError');
  }
});
