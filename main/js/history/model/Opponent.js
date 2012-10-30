net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Difficulty = net.riemschneider.history.model.Difficulty;
  var LevelOrderChance = net.riemschneider.history.model.LevelOrderChance;

  net.riemschneider.history.model.Opponent = {
    create: function create(id, name, avatarImageIdx, difficulty, knowledgeChancesByLevel, levelOrderChances) {
      ArgumentUtils.assertString(id);
      ArgumentUtils.assertString(name);
      ArgumentUtils.assertNumber(avatarImageIdx);
      ArgumentUtils.assertType(difficulty, Difficulty);
      ArgumentUtils.assertArray(knowledgeChancesByLevel);
      ArgumentUtils.assertArray(levelOrderChances);

      return {
        getId: function getId() { return id; },
        getName: function getName() { return name; },
        getAvatarImageIdx: function getAvatarImageIdx() { return avatarImageIdx; },
        getDifficulty: function getDifficulty() { return difficulty; },
        getKnowledgeChance: function getKnowledgeChance(level) { return knowledgeChancesByLevel[level]; },
        getLevelOrderChances: function getLevelOrderChances() { return levelOrderChances; }
      };
    },

    createFromState: function createFromState(state) {
      ArgumentUtils.assertNotNull(state);
      ArgumentUtils.assertArray(state.levelOrderChances);
      ArgumentUtils.assertString(state.difficulty);

      var levelOrderChances = [];
      for (var idx = 0, len = state.levelOrderChances.length; idx < len; ++idx) {
        levelOrderChances[idx] = LevelOrderChance.createFromState(state.levelOrderChances[idx]);
      }
      var difficulty = Difficulty[state.difficulty];
      return net.riemschneider.history.model.Opponent.create(
          state.id, state.name, state.avatarImageIdx, difficulty, state.knowledgeChancesByLevel, levelOrderChances);
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Opponent', net.riemschneider.history.model.Opponent);
}());
