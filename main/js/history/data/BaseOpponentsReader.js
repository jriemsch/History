net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var WebUtils = net.riemschneider.utils.WebUtils;
  var Opponent = net.riemschneider.history.model.Opponent;

  net.riemschneider.history.data.BaseOpponentsReader = {
    create: function create() {
      return {
        read: function read(file, addOpponent, onDone) {
          ArgumentUtils.assertString(file);
          ArgumentUtils.assertFunction(addOpponent);
          ArgumentUtils.assertFunction(onDone);

          WebUtils.getJson(file, parseOpponentData);

          function parseOpponentData(data) {
            ArgumentUtils.assertArray(data);

            for (var idx = 0, len = data.length; idx < len; ++idx) {
              addOpponent(Opponent.createFromState(data[idx]));
            }

            onDone();
          }
        }
      };
    }
  };
}());
