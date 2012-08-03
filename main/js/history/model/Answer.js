net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.Answer = {
    create: function create(time) {
      ArgumentUtils.assertRange(time, 0);

      return {
        getTime: function getTime() { return time; }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Answer', net.riemschneider.history.model.Answer);
}());
