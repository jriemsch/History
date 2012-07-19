var BaseOpponents = net.riemschneider.history.data.BaseOpponents;

TestCase('BaseOpponentsTest', {
  testInit: function () {
    var list = [];
    BaseOpponents.init(list);
    assertEquals(31, list.length);
  }
});