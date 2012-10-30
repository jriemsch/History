var Answer = net.riemschneider.history.model.Answer;
var OrderChoice = net.riemschneider.history.model.OrderChoice;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('OrderChoicesTest', {
  testCreateAndGetters: function () {
    var choices = ['answer1', 'answer2'];
    var correct = [0, 1];
    var answer = OrderChoice.create(5, choices, correct);
    assertNotNull(answer);
    assertTrue(TypeUtils.isOfType(answer, Answer));
    assertTrue(TypeUtils.isOfType(answer, OrderChoice));
    assertEquals(5, answer.getTime());
    assertSame(choices, answer.getChoices());
    assertEquals(correct, answer.getCorrect());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { OrderChoice.create(5, [''], null); }, 'TypeError');
    assertException(function () { OrderChoice.create(5, null, [0]); }, 'TypeError');
    assertException(function () { OrderChoice.create(null, [''], [0]); }, 'TypeError');

    assertException(function () { OrderChoice.create(5, [''], 0); }, 'TypeError');
    assertException(function () { OrderChoice.create(5, [], [0]); }, 'TypeError');
    assertException(function () { OrderChoice.create(5, [5, 6], [0]); }, 'TypeError');
    assertException(function () { OrderChoice.create(5, ['', ''], [0]); }, 'TypeError');
    assertException(function () { OrderChoice.create(5, [''], [1]); }, 'TypeError');
  },

  testCreateFromState: function () {
    var choices = [ 'c1', 'c2' ];
    var correct = [ 0, 1 ];
    var answer = OrderChoice.createFromState({ time: 5, choices: choices, correct: correct });
    assertNotNull(answer);
    assertTrue(TypeUtils.isOfType(answer, Answer));
    assertTrue(TypeUtils.isOfType(answer, OrderChoice));
    assertEquals(5, answer.getTime());
    assertSame(choices, answer.getChoices());
    assertEquals(correct, answer.getCorrect());
  },

  testCreateFromStateNullAndTypeSafe: function () {
    var choices = [ 'c1', 'c2' ];
    var correct = [ 0, 1 ];

    assertException(function () { OrderChoice.createFromState(null); }, 'TypeError');

    assertException(function () { OrderChoice.createFromState({ time: 5, choices: choices }); }, 'TypeError');
    assertException(function () { OrderChoice.createFromState({ time: 5, correct: correct }); }, 'TypeError');
    assertException(function () { OrderChoice.createFromState({ choices: choices, correct: correct }); }, 'TypeError');

    assertException(function () { OrderChoice.createFromState({ time: 5, choices: choices, correct: 0 }); }, 'TypeError');
    assertException(function () { OrderChoice.createFromState({ time: 5, choices: 'c1', correct: correct }); }, 'TypeError');
    assertException(function () { OrderChoice.createFromState({ time: '5', choices: choices, correct: correct }); }, 'TypeError');

    assertException(function () { OrderChoice.createFromState({ time: 5, choices: choices, correct: [ '0', '1' ] }); }, 'TypeError');
    assertException(function () { OrderChoice.createFromState({ time: 5, choices: [ 0, 1 ], correct: correct }); }, 'TypeError');
    assertException(function () { OrderChoice.createFromState({ time: 5, choices: choices, correct: [ 0 ] }); }, 'TypeError');
  }
});
