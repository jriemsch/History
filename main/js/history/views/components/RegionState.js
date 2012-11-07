net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.views.components.RegionState = TypeUtils.enhanceEnum('net.riemschneider.history.views.components.RegionState', {
    UNCLAIMED: { key: 'UNCLAIMED' },
    SELECTED: { key: 'SELECTED' },
    OWNED_PLAYER0: { key: 'OWNED_PLAYER0' },
    OWNED_PLAYER1: { key: 'OWNED_PLAYER1' },
    OWNED_PLAYER2: { key: 'OWNED_PLAYER2' },
    LOST: { key: 'LOST' }
  });

  net.riemschneider.history.views.components.RegionState.values = [
    net.riemschneider.history.views.components.RegionState.UNCLAIMED,
    net.riemschneider.history.views.components.RegionState.SELECTED,
    net.riemschneider.history.views.components.RegionState.OWNED_PLAYER0,
    net.riemschneider.history.views.components.RegionState.OWNED_PLAYER1,
    net.riemschneider.history.views.components.RegionState.OWNED_PLAYER2,
    net.riemschneider.history.views.components.RegionState.LOST
  ];
}());