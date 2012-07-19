net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var Difficulty = net.riemschneider.history.model.Difficulty;

  net.riemschneider.history.model.Opponent = {
    create: function create(id, name, avatarImageIdx, difficulty, knowledgeChancesByLevel, levelOrderChances) {
      ArgumentUtils.assertNotNull(id);
      ArgumentUtils.assertNotNull(name);
      ArgumentUtils.assertNotNull(avatarImageIdx);
      ArgumentUtils.assertType(difficulty, Difficulty);
      ArgumentUtils.assertNotNull(knowledgeChancesByLevel);
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
    }
  };
}());
