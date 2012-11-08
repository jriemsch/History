var AnswerComponent = net.riemschneider.history.views.components.AnswerComponent;
var Answer = net.riemschneider.history.model.Answer;

TestCase('AnswerComponentTest', {
  setUp: function () {
    AnswerComponent.clearRegistry();

    var answerComponentType = {
      isCompatible: function isCompatible(answer) { return answer.getTime() === 10; },
      create: function create(answer) {
        return {
          getAnswer: function getAnswer() { return answer; }
        };
      }
    };

    AnswerComponent.registerAnswerComponentType(answerComponentType);
  },

  testCreate: function () {
    var answer = Answer.create(10);
    var answerComponent = AnswerComponent.create(answer);
    assertNotNull(answerComponent);
    assertSame(answer, answerComponent.getAnswer());
  },

  testCreateWithIncompatibleAnswerReturnsDefault: function () {
    var answer = Answer.create(0);
    var answerComponent = AnswerComponent.create(answer);
    assertNotNull(answerComponent);
    assertEquals(0, answerComponent.show().length);
    assertSame(answer, answerComponent.getAnswer());
  },

  testRegisterAnswerComponentTypeNullAndTypeSafe: function () {
    assertException(function () { AnswerComponent.registerAnswerComponentType(null); }, 'TypeError');
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { AnswerComponent.create(null); }, 'TypeError');

    assertException(function () { AnswerComponent.create({}); }, 'TypeError');
  }
});
