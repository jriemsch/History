var RegionState = net.riemschneider.history.views.components.RegionState;

TestCase('RegionStateTest', {
  testLoop: function () {
    var expected = [ RegionState.UNCLAIMED, RegionState.SELECTED, RegionState.OWNED_PLAYER0, RegionState.OWNED_PLAYER1, RegionState.OWNED_PLAYER2, RegionState.LOST ];
    var len = RegionState.values.length;
    assertEquals(6, len);
    for (var idx = 0; idx < len; ++idx) {
      var difficulty = RegionState.values[idx];
      assertSame(expected[idx], difficulty);
    }
  }
});
