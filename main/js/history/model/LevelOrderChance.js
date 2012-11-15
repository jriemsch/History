net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

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
    },

    createFromState: function createFromState(state) {
      ArgumentUtils.assertNotNull(state);
      return net.riemschneider.history.model.LevelOrderChance.create(state.levelOrder, state.chance);
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.LevelOrderChance', net.riemschneider.history.model.LevelOrderChance);
}());
