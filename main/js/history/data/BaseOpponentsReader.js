net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var WebUtils = net.riemschneider.utils.WebUtils;
  var Opponent = net.riemschneider.history.model.Opponent;

  net.riemschneider.history.data.BaseOpponentsReader = {
    create: function create(opponents) {
      ArgumentUtils.assertArray(opponents);

      return {
        read: function read(file) {
          ArgumentUtils.assertString(file);

          WebUtils.getJson(file, parseOpponentData);

          function parseOpponentData(data) {
            ArgumentUtils.assertArray(data);

            for (var idx = 0, len = data.length; idx < len; ++idx) {
              opponents.push(Opponent.createFromState(data[idx]));
            }
          }
        }
      };
    }
  };
}());
