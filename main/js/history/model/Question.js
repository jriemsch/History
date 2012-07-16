net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.model.Question = {
    DIFFICULTY: {
      EASY: 0,
      MEDIUM: 1,
      HARD: 2
    },

    create: function create(id, difficulty, text, answer) {
      ArgumentUtils.assertNotNull(id);
      ArgumentUtils.assertContains(difficulty, net.riemschneider.history.model.Question.DIFFICULTY);
      ArgumentUtils.assertNotNull(text);
      ArgumentUtils.assertType(answer, net.riemschneider.history.model.Answer);

      return {
        getId: function getId() { return id; },
        getDifficulty: function getDifficulty() { return difficulty; },
        getText: function getText() { return text; },
        getAnswer: function getAnswer() { return answer; }
      };
    }
  };
}());
