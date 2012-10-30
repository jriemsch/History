var Answer = net.riemschneider.history.model.Answer;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('AnswerTest', {
  setUp: function () {
    Answer.resetStateReaderRegistry();
  },

  testCreateAndGetters: function () {
    var answer = Answer.create(5);
    assertNotNull(answer);
    assertTrue(TypeUtils.isOfType(answer, Answer));
    assertEquals(5, answer.getTime());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { Answer.create(null); }, 'TypeError');
    assertException(function () { Answer.create(-1); }, 'TypeError');
  },

  testStateReader: function () {
    Answer.registerStateReader('type', function (state) { return Answer.create(state.value); });
    var answer = Answer.createFromState({ type: 'type', value: 5 });
    assertEquals(5, answer.getTime());
  },

  testResetStateReaderRegistry: function () {
    Answer.registerStateReader('type', function (state) { return Answer.create(state.value); });
    Answer.resetStateReaderRegistry();
    assertException(function () { Answer.createFromState({ type: 'type', value: 5 }); }, 'TypeError');
  },

  testRegisterStateReaderNullAndTypeSafe: function () {
    assertException(function () { Answer.registerStateReader('type', null); }, 'TypeError');
    assertException(function () { Answer.registerStateReader(null, function () {}); }, 'TypeError');
    assertException(function () { Answer.registerStateReader('type', 90); }, 'TypeError');
    assertException(function () { Answer.registerStateReader(90, function () {}); }, 'TypeError');
  },

  testCreateFromStateNullAndTypeSafe: function () {
    assertException(function () { Answer.createFromState(null); }, 'TypeError');
    assertException(function () { Answer.createFromState(90); }, 'TypeError');
    assertException(function () { Answer.createFromState({}); }, 'TypeError');
    assertException(function () { Answer.createFromState({ type: 'type' }); }, 'TypeError');

    Answer.registerStateReader('type', function () { return {}; });
    assertException(function () { Answer.createFromState({ type: 'type' }); }, 'TypeError');
  }
});
