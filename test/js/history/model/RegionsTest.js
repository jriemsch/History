var Region = net.riemschneider.history.model.Region;
var Regions = net.riemschneider.history.model.Regions;
var Position = net.riemschneider.graphics.Position;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('RegionsTest', {
  testCreate: function () {
    var pos = Position.create(1, 2);
    var region1 = Region.create('id1', 'img', pos, pos);
    var region2 = Region.create('id2', 'img', pos, pos);
    var regionArray = [region1, region2];
    var regions = Regions.create(regionArray);
    assertTrue(TypeUtils.isOfType(regions, Regions));
    assertSame(regionArray, regions.getRegions());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { Regions.create(null); }, 'TypeError');

    assertException(function () { Regions.create([{}]); }, 'TypeError');
    assertException(function () { Regions.create('reg'); }, 'TypeError');
  }
});