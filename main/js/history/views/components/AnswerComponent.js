net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  var answerComponentTypes = [];

  function getCompatibleAnswerComponentType(answer) {
    for (var idx = 0, len = answerComponentTypes.length; idx < len; ++idx) {
      var answerComponentType = answerComponentTypes[idx];
      if (answerComponentType.isCompatible(answer)) {
        return answerComponentType;
      }
    }

    return {
      create: function create(answer) {
        return {
          show: function show() { return []; },
          getAnswer: function getAnswer() { return answer; }
        };
      }
    };
  }

  net.riemschneider.history.views.components.AnswerComponent = {
    create: function create(answer) {
      ArgumentUtils.assertType(answer, net.riemschneider.history.model.Answer);
      var answerComponentType = getCompatibleAnswerComponentType(answer);
      return answerComponentType.create(answer);
    },

    registerAnswerComponentType: function registerAnswerComponentType(answerComponentType) {
      ArgumentUtils.assertNotNull(answerComponentType);
      answerComponentTypes.push(answerComponentType);
    },

    clearRegistry: function clearRegistry() { answerComponentTypes = []; }
  };
}());
