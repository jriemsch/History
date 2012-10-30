var Answer = net.riemschneider.history.model.Answer;
var MultipleChoice = net.riemschneider.history.model.MultipleChoice;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('MultipleChoicesTest', {
  testCreateAndGetters: function () {
    var choices = ['answer1', 'answer2'];
    var correct = [1];
    var answer = MultipleChoice.create(5, choices, correct);
    assertNotNull(answer);
    assertTrue(TypeUtils.isOfType(answer, Answer));
    assertTrue(TypeUtils.isOfType(answer, MultipleChoice));
    assertEquals(5, answer.getTime());
    assertSame(choices, answer.getChoices());
    assertEquals(correct, answer.getCorrectChoices());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { MultipleChoice.create(5, [''], null); }, 'TypeError');
    assertException(function () { MultipleChoice.create(5, null, [0]); }, 'TypeError');
    assertException(function () { MultipleChoice.create(null, [''], [0]); }, 'TypeError');

    assertException(function () { MultipleChoice.create(5, [], 0); }, 'TypeError');
    assertException(function () { MultipleChoice.create(5, [], [0]); }, 'TypeError');
    assertException(function () { MultipleChoice.create(5, [5, 6], [0]); }, 'TypeError');
    assertException(function () { MultipleChoice.create(5, [''], [1]); }, 'TypeError');
  },

  testCreateFromState: function () {
    var choices = [ 'c1', 'c2', 'c3' ];
    var correct = [ 0, 1 ];
    var answer = MultipleChoice.createFromState({ time: 2, choices: choices, correct: correct });
    assertNotNull(answer);
    assertTrue(TypeUtils.isOfType(answer, Answer));
    assertTrue(TypeUtils.isOfType(answer, MultipleChoice));
    assertEquals(2, answer.getTime());
    assertSame(choices, answer.getChoices());
    assertEquals(correct, answer.getCorrectChoices());
  },

  testCreateFromStateNullAndTypeSafe: function () {
    var choices = [ 'c1', 'c2', 'c3' ];
    var correct = [ 0, 1 ];

    assertException(function () { MultipleChoice.createFromState(null); }, 'TypeError');

    assertException(function () { MultipleChoice.createFromState({ time: 2, choices: choices }); }, 'TypeError');
    assertException(function () { MultipleChoice.createFromState({ time: 2, correct: correct }); }, 'TypeError');
    assertException(function () { MultipleChoice.createFromState({ choices: choices, correct: correct }); }, 'TypeError');

    assertException(function () { MultipleChoice.createFromState({ time: 2, choices: choices, correct: 1 }); }, 'TypeError');
    assertException(function () { MultipleChoice.createFromState({ time: 2, choices: 'c1', correct: correct }); }, 'TypeError');
    assertException(function () { MultipleChoice.createFromState({ time: '2', choices: choices, correct: correct }); }, 'TypeError');

    assertException(function () { MultipleChoice.createFromState({ time: 2, choices: choices, correct: [ 3 ] }); }, 'TypeError');
    assertException(function () { MultipleChoice.createFromState({ time: 2, choices: choices, correct: [ '3' ] }); }, 'TypeError');
    assertException(function () { MultipleChoice.createFromState({ time: 2, choices: [ 3 ], correct: correct }); }, 'TypeError');
  }
});
