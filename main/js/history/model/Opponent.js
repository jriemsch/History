net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.model.Opponent = {
    create: function (id, name, avatarImageIdx, knowledgeChancesByLevel, levelOrderChances) {
      ArgumentUtils.assertNotNull(id);
      ArgumentUtils.assertNotNull(name);
      ArgumentUtils.assertNotNull(avatarImageIdx);
      ArgumentUtils.assertNotNull(knowledgeChancesByLevel);
      ArgumentUtils.assertArray(knowledgeChancesByLevel);
      ArgumentUtils.assertArray(levelOrderChances);

      return {
        getId: function getId() { return id; },
        getName: function getName() { return name; },
        getAvatarImageIdx: function getAvatarImageIdx() { return avatarImageIdx; },
        getKnowledgeChance: function getKnowledgeChance(level) { return knowledgeChancesByLevel[level]; },
        getLevelOrderChances: function getLevelOrderChances() { return levelOrderChances; }
      };
    }
  };
}());
