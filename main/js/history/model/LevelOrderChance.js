net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.model.LevelOrderChance = {
    create: function (levelOrder, chance) {
      ArgumentUtils.assertArray(levelOrder, function (elem) {
        ArgumentUtils.assertRange(elem, 0, levelOrder.length - 1);
      });
      ArgumentUtils.assertNotNull(chance);
      ArgumentUtils.assertTrue(chance >= 0 && chance <= 1);

      return {
        getLevelOrder: function getLevelOrder() { return levelOrder; },
        getChance: function getChance() { return chance; }
      };
    }
  };
}());
