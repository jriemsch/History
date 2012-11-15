net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Region = net.riemschneider.history.model.Region;

  net.riemschneider.history.model.Regions = {
    create: function create(regions) {
      ArgumentUtils.assertArray(regions, function (elem) { ArgumentUtils.assertType(elem, net.riemschneider.history.model.Region); });

      var regionsById = {};
      for (var idx = 0, len = regions.length; idx < len; ++idx) {
        var region = regions[idx];
        regionsById[region.getId()] = region;
      }

      return {
        getRegions: function getRegions() { return regions; },
        getRegion: function getRegion(regionId) {
          ArgumentUtils.assertString(regionId);
          return regionsById[regionId];
        }
      };
    },

    createFromState: function createFromState(state) {
      ArgumentUtils.assertArray(state);
      var regions = [];
      for (var idx = 0, len = state.length; idx < len; ++idx) {
        regions.push(Region.createFromState(state[idx]));
      }
      return net.riemschneider.history.model.Regions.create(regions);
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Regions', net.riemschneider.history.model.Regions);
}());
