net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.views.components.AnswerComponentRegistry = {
    create: function create() {
      var answerComponentTypes = [];

      function getCompatibleAnswerComponentType(answer) {
        for (var idx = 0, len = answerComponentTypes.length; idx < len; ++idx) {
          var answerComponentType = answerComponentTypes[idx];
          if (answerComponentType.isCompatible(answer)) {
          return answerComponentType;
          }
        }

        return {
          createAnswerComponent: function createAnswerComponent(answer) {
          return {
            show: function show() { return []; },
            getAnswer: function getAnswer() { return answer; }
          };
          }
        };
      }

      return {
        createAnswerComponent: function createAnswerComponent(answer) {
          ArgumentUtils.assertType(answer, net.riemschneider.history.model.Answer);
          var answerComponentType = getCompatibleAnswerComponentType(answer);
          return answerComponentType.createAnswerComponent(answer);
        },

        registerAnswerComponentType: function registerAnswerComponentType(answerComponentType) {
          ArgumentUtils.assertNotNull(answerComponentType);
          answerComponentTypes.push(answerComponentType);
        }
      };
    }
  };
}());
