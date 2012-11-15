net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  var stateReaders = {};

  net.riemschneider.history.model.Answer = {
    create: function create(time) {
      ArgumentUtils.assertRange(time, 0);

      return {
        getTime: function getTime() { return time; }
      };
    },

    createFromState: function createFromState(state) {
      ArgumentUtils.assertNotNull(state);
      var type = state.type;
      ArgumentUtils.assertNotNull(type);
      var readerFunc = stateReaders[type];
      ArgumentUtils.assertFunction(readerFunc);
      var answer = readerFunc(state);
      ArgumentUtils.assertType(answer, net.riemschneider.history.model.Answer);
      return answer;
    },

    registerStateReader: function registerStateReader(type, readerFunc) {
      ArgumentUtils.assertString(type);
      ArgumentUtils.assertFunction(readerFunc);
      stateReaders[type] = readerFunc;
    },

    resetStateReaderRegistry: function resetStateReaderRegistry() {
      stateReaders = {};
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Answer', net.riemschneider.history.model.Answer);
}());
