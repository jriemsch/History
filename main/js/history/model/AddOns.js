net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.AddOns = {
    create: function create() {
      var unlocked = {};

      return {
        unlock: function unlock(id) {
          unlocked[id] = true;
        },

        isUnlocked: function isUnlocked(id) {
          return unlocked[id] === true;
        },

        getState: function getState() {
          return {
            unlocked: unlocked
          }
        },

        setState: function setState(newState) {
          ArgumentUtils.assertNotNull(newState);
          ArgumentUtils.assertMap(newState.unlocked);
          unlocked = newState.unlocked;
        }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.AddOns', net.riemschneider.history.model.AddOns);
}());
