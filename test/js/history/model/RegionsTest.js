var Region = net.riemschneider.history.model.Region;
var Regions = net.riemschneider.history.model.Regions;
var Position = net.riemschneider.graphics.Position;
var ImageData = net.riemschneider.graphics.ImageData;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('RegionsTest', {
  testCreate: function () {
    var pos = Position.create(1, 2);
    var imgData = ImageData.create('img', pos, pos);
    var region1 = Region.create('id1', imgData, pos);
    var region2 = Region.create('id2', imgData, pos);
    var regionArray = [region1, region2];
    var regions = Regions.create(regionArray);
    assertTrue(TypeUtils.isOfType(regions, Regions));
    assertSame(regionArray, regions.getRegions());
    assertEquals('id1', regions.getRegions()[0].getId());
    assertEquals('id2', regions.getRegions()[1].getId());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { Regions.create(null); }, 'TypeError');

    assertException(function () { Regions.create([{}]); }, 'TypeError');
    assertException(function () { Regions.create('reg'); }, 'TypeError');
  },

  testCreateFromState: function () {
    var difficultyPos = { x: 3, y: 4 };
    var imgSize = { x: 10, y: 20 };
    var imgPos = { x: 1, y: 2 };
    var region1 = { id: 'id1', imgSrc: 'img', imgPos: imgPos, imgSize: imgSize, difficultyPos: difficultyPos };
    var region2 = { id: 'id2', imgSrc: 'img', imgPos: imgPos, imgSize: imgSize, difficultyPos: difficultyPos };
    var regions = Regions.createFromState([ region1, region2 ]);
    assertTrue(TypeUtils.isOfType(regions, Regions));
    assertEquals(2, regions.getRegions().length);
    assertEquals('id1', regions.getRegions()[0].getId());
    assertEquals('id2', regions.getRegions()[1].getId());
  },

  testCreateFromStateNullAndTypeSafe: function () {
    assertException(function () { Regions.createFromState(null); }, 'TypeError');

    assertException(function () { Regions.createFromState({}); }, 'TypeError');
  },

  testGetRegion: function () {
    var pos = Position.create(1, 2);
    var imgData = ImageData.create('img', pos, pos);
    var region1 = Region.create('id1', imgData, pos);
    var region2 = Region.create('id2', imgData, pos);
    var regionArray = [region1, region2];
    var regions = Regions.create(regionArray);
    assertSame(region1, regions.getRegion('id1'));
    assertSame(region2, regions.getRegion('id2'));
    assertUndefined(regions.getRegion('id3'));
  },

  testGetRegionNullAndTypeSafe: function () {
    var regions = Regions.create([]);

    assertException(function () { regions.getRegion(null); }, 'TypeError');

    assertException(function () { regions.getRegion(123); }, 'TypeError');
  }
});