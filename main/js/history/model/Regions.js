net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.Regions = {
    create: function create(regions) {
      ArgumentUtils.assertArray(regions, function (elem) { ArgumentUtils.assertType(elem, net.riemschneider.history.model.Region); });

      return {
        getRegions: function getRegions() { return regions; }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Regions', net.riemschneider.history.model.Regions);
}());
