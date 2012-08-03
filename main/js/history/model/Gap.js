net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.Gap = {
    create: function create(fillers, correctChoice) {
      ArgumentUtils.assertArray(fillers, function (elem) { ArgumentUtils.assertString(elem); });
      ArgumentUtils.assertRange(correctChoice, 0, fillers.length - 1);

      return {
        getFillers: function getFillers() { return fillers; },
        getCorrectChoice: function getCorrectChoice() { return correctChoice; }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Gap', net.riemschneider.history.model.Gap);
}());