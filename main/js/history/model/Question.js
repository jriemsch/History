net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var Difficulty = net.riemschneider.history.model.Difficulty;
  var Answer = net.riemschneider.history.model.Answer;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.Question = {
    create: function create(id, difficulty, text, answer) {
      ArgumentUtils.assertString(id);
      ArgumentUtils.assertType(difficulty, Difficulty);
      ArgumentUtils.assertString(text);
      ArgumentUtils.assertType(answer, Answer);

      return {
        getId: function getId() { return id; },
        getDifficulty: function getDifficulty() { return difficulty; },
        getText: function getText() { return text; },
        getAnswer: function getAnswer() { return answer; }
      };
    },

    createFromState: function createFromState(state) {
      ArgumentUtils.assertNotNull(state);

      var difficulty = Difficulty[state.difficulty];
      ArgumentUtils.assertNotNull(difficulty);
      var answer = Answer.createFromState(state.answer);

      return net.riemschneider.history.model.Question.create(state.id, difficulty, state.text, answer);
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Question', net.riemschneider.history.model.Question);
}());
