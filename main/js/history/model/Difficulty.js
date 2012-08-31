net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.Difficulty = TypeUtils.enhanceEnum('net.riemschneider.history.model.Difficulty', {
    EASY: { key: 'EASY', easier: function easier() { return net.riemschneider.history.model.Difficulty.EASY; } },
    MEDIUM: { key: 'MEDIUM', easier: function easier() { return net.riemschneider.history.model.Difficulty.EASY; } },
    HARD: { key: 'HARD', easier: function easier() { return net.riemschneider.history.model.Difficulty.MEDIUM; } }
  });

  net.riemschneider.history.model.Difficulty.values = [
    net.riemschneider.history.model.Difficulty.EASY,
    net.riemschneider.history.model.Difficulty.MEDIUM,
    net.riemschneider.history.model.Difficulty.HARD
  ];
}());
