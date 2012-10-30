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
  },

  testCreateFromState: function () {
    var gapChoice = GapChoice.createFromState({
      time: 2,
      choices: [ 'c1', 'c2' ],
      gaps: {
        g1: { fillers: [ 'f1', 'f2' ], correct: 0 },
        g2: { fillers: [ 'f3', 'f4' ], correct: 1 }
      }
    });
    assertNotNull(gapChoice);
    assertTrue(TypeUtils.isOfType(gapChoice, Answer));
    assertTrue(TypeUtils.isOfType(gapChoice, GapChoice));
    assertEquals(2, gapChoice.getTime());
    assertEquals(2, gapChoice.getChoices().length);
    assertEquals('c1', gapChoice.getChoices()[0]);
    assertEquals('c2', gapChoice.getChoices()[1]);
    assertEquals(0, gapChoice.getGaps().g1.getCorrectChoice());
    assertEquals(2, gapChoice.getGaps().g1.getFillers().length);
    assertEquals('f1', gapChoice.getGaps().g1.getFillers()[0]);
    assertEquals('f2', gapChoice.getGaps().g1.getFillers()[1]);
    assertEquals(1, gapChoice.getGaps().g2.getCorrectChoice());
    assertEquals(2, gapChoice.getGaps().g2.getFillers().length);
    assertEquals('f3', gapChoice.getGaps().g2.getFillers()[0]);
    assertEquals('f4', gapChoice.getGaps().g2.getFillers()[1]);
  },

  testCreateFromStateNullAndTypeSafe: function () {
    var gaps = {
      g1: { fillers: [ 'f1', 'f2' ], correct: 0 },
      g2: { fillers: [ 'f3', 'f4' ], correct: 1 }
    };
    var choices = [ 'c1', 'c2' ];

    assertException(function () { GapChoice.createFromState(null); }, 'TypeError');

    assertException(function () { GapChoice.createFromState({ choices: choices, gaps: gaps }); }, 'TypeError');
    assertException(function () { GapChoice.createFromState({ time: 2, gaps: gaps }); }, 'TypeError');
    assertException(function () { GapChoice.createFromState({ time: 2, choices: choices }); }, 'TypeError');

    assertException(function () { GapChoice.createFromState({ time: 2, choices: 'c1', gaps: gaps }); }, 'TypeError');
    assertException(function () { GapChoice.createFromState({ time: 2, choices: [ 1 ], gaps: gaps }); }, 'TypeError');
    assertException(function () { GapChoice.createFromState({ time: 2, choices: choices, gaps: { g1: null } }); }, 'TypeError');
    assertException(function () { GapChoice.createFromState({ time: 2, choices: choices, gaps: { g1: {} } }); }, 'TypeError');
    assertException(function () { GapChoice.createFromState({ time: 2, choices: choices, gaps: { g1: { fillers: [ 'f1', 'f2' ], correct: null } } }); }, 'TypeError');
    assertException(function () { GapChoice.createFromState({ time: 2, choices: choices, gaps: { g1: { fillers: null, correct: 0 } } }); }, 'TypeError');
    assertException(function () { GapChoice.createFromState({ time: 2, choices: choices, gaps: { g1: { fillers: [ 'f1', 'f2' ], correct: 'c' } } }); }, 'TypeError');
    assertException(function () { GapChoice.createFromState({ time: 2, choices: choices, gaps: { g1: { fillers: {}, correct: 0 } } }); }, 'TypeError');
    assertException(function () { GapChoice.createFromState({ time: 2, choices: choices, gaps: { g1: { fillers: [ 'f1' ], correct: 0 } } }); }, 'TypeError');
    assertException(function () { GapChoice.createFromState({ time: 2, choices: choices, gaps: { g1: { fillers: [ 'f1', 'f2' ], correct: 2 } } }); }, 'TypeError');
    assertException(function () { GapChoice.createFromState({ time: 2, choices: choices, gaps: { g1: { fillers: [ 'f1', 2 ], correct: 0 } } }); }, 'TypeError');
  }
});
