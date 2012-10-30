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
    assertEquals(correctOrder, answer.getCorrect());
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
  },

  testCreateFromState: function () {
    var mapChoice = MapChoice.createFromState({ time: 2, choices: [ 'c1', 'c2' ], mappings: [ 'm1', 'm2' ], correct: [ 0, 1 ] });
    assertEquals(2, mapChoice.getTime());
    assertEquals(2, mapChoice.getChoices().length);
    assertEquals('c1', mapChoice.getChoices()[0]);
    assertEquals('c2', mapChoice.getChoices()[1]);
    assertEquals(2, mapChoice.getMappings().length);
    assertEquals('m1', mapChoice.getMappings()[0]);
    assertEquals('m2', mapChoice.getMappings()[1]);
    assertEquals(0, mapChoice.getCorrect()[0]);
    assertEquals(1, mapChoice.getCorrect()[1]);
  },

  testCreateFromStateNullAndTypeSafe: function () {
    var choices = [ 'c1', 'c2' ];
    var mappings = [ 'm1', 'm2' ];
    var correct = [ 0, 1 ];

    assertException(function () { MapChoice.createFromState(null); }, 'TypeError');

    assertException(function () { MapChoice.createFromState({ time: 2, choices: choices, mappings: mappings }); }, 'TypeError');
    assertException(function () { MapChoice.createFromState({ time: 2, choices: choices, correct: correct }); }, 'TypeError');
    assertException(function () { MapChoice.createFromState({ time: 2, mappings: mappings, correct: correct }); }, 'TypeError');
    assertException(function () { MapChoice.createFromState({ choices: choices, mappings: mappings, correct: correct }); }, 'TypeError');

    assertException(function () { MapChoice.createFromState({ time: 2, choices: choices, mappings: mappings, correct: 0 }); }, 'TypeError');
    assertException(function () { MapChoice.createFromState({ time: 2, choices: choices, mappings: 'm', correct: correct }); }, 'TypeError');
    assertException(function () { MapChoice.createFromState({ time: 2, choices: 'c', mappings: mappings, correct: correct }); }, 'TypeError');
    assertException(function () { MapChoice.createFromState({ time: 't', choices: choices, mappings: mappings, correct: correct }); }, 'TypeError');

    assertException(function () { MapChoice.createFromState({ time: 2, choices: choices, mappings: mappings, correct: [ 0 ] }); }, 'TypeError');
    assertException(function () { MapChoice.createFromState({ time: 2, choices: choices, mappings: [ 'm1' ], correct: correct }); }, 'TypeError');
    assertException(function () { MapChoice.createFromState({ time: 2, choices: [ 'c1' ], mappings: mappings, correct: correct }); }, 'TypeError');

    assertException(function () { MapChoice.createFromState({ time: 2, choices: choices, mappings: mappings, correct: [ '0', '1' ] }); }, 'TypeError');
    assertException(function () { MapChoice.createFromState({ time: 2, choices: choices, mappings: [ 0, 1 ], correct: correct }); }, 'TypeError');
    assertException(function () { MapChoice.createFromState({ time: 2, choices: [ 0, 1 ], mappings: mappings, correct: correct }); }, 'TypeError');
  }
});
