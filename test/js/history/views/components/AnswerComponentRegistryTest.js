var AnswerComponentRegistry = net.riemschneider.history.views.components.AnswerComponentRegistry;
var Answer = net.riemschneider.history.model.Answer;

TestCase('AnswerComponentRegistryTest', {
  setUp: function () {
    this.registry = AnswerComponentRegistry.create();
  
    var answerComponentType = {
      isCompatible: function isCompatible(answer) { return answer.getTime() === 10; },
      createAnswerComponent: function createAnswerComponent(answer) {
        return {
          getAnswer: function getAnswer() { return answer; }
        };
      }
    };

    this.registry.registerAnswerComponentType(answerComponentType);
  },

  testCreateAnswerComponent: function () {
    var answer = Answer.create(10);
    var answerComponent = this.registry.createAnswerComponent(answer);
    assertNotNull(answerComponent);
    assertSame(answer, answerComponent.getAnswer());
  },

  testCreateAnswerComponentWithIncompatibleAnswerReturnsDefault: function () {
    var answer = Answer.create(0);
    var answerComponent = this.registry.createAnswerComponent(answer);
    assertNotNull(answerComponent);
    assertEquals(0, answerComponent.show().length);
    assertSame(answer, answerComponent.getAnswer());
  },

  testRegisterAnswerComponentTypeNullAndTypeSafe: function () {
    var registry = this.registry;
    assertException(function () { registry.registerAnswerComponentType(null); }, 'TypeError');
  },

  testCreateAnswerComponentNullAndTypeSafe: function () {
    var registry = this.registry;
    assertException(function () { registry.createAnswerComponent(null); }, 'TypeError');

    assertException(function () { registry.createAnswerComponent({}); }, 'TypeError');
  }
});
