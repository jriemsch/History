net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var Difficulty = net.riemschneider.history.model.Difficulty;
  var Answer = net.riemschneider.history.model.Answer;

  net.riemschneider.history.model.Question = {
    create: function create(id, difficulty, text, answer) {
      ArgumentUtils.assertNotNull(id);
      ArgumentUtils.assertType(difficulty, Difficulty);
      ArgumentUtils.assertNotNull(text);
      ArgumentUtils.assertType(answer, Answer);

      return {
        getId: function getId() { return id; },
        getDifficulty: function getDifficulty() { return difficulty; },
        getText: function getText() { return text; },
        getAnswer: function getAnswer() { return answer; }
      };
    }
  };
}());
