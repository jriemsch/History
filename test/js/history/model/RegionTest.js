var Region = net.riemschneider.history.model.Region;
var Position = net.riemschneider.graphics.Position;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('RegionTest', {
  testCreate: function () {
    var imgPos = Position.create(1, 2);
    var imgSize = Position.create(10, 20);
    var difficultyPos = Position.create(3, 4);
    var region = Region.create('id', 'img', imgPos, imgSize, difficultyPos);
    assertTrue(TypeUtils.isOfType(region, Region));
    assertEquals('id', region.getId());
    assertEquals('img', region.getImgSrc());
    assertSame(imgPos, region.getImgPos());
    assertSame(imgSize, region.getImgSize());
    assertSame(difficultyPos, region.getDifficultyPos());
  },

  testNullAndTypeSafe: function () {
    var imgPos = Position.create(1, 2);
    var imgSize = Position.create(10, 20);
    var difficultyPos = Position.create(3, 4);

    assertException(function () { Region.create('id', 'img', imgPos, imgSize, null); }, 'TypeError');
    assertException(function () { Region.create('id', 'img', imgPos, null, difficultyPos); }, 'TypeError');
    assertException(function () { Region.create('id', 'img', null, imgSize, difficultyPos); }, 'TypeError');
    assertException(function () { Region.create('id', null, imgPos, imgSize, difficultyPos); }, 'TypeError');
    assertException(function () { Region.create(null, 'img', imgPos, imgSize, difficultyPos); }, 'TypeError');

    assertException(function () { Region.create('id', 'img', imgPos, imgSize, {}); }, 'TypeError');
    assertException(function () { Region.create('id', 'img', imgPos, {}, difficultyPos); }, 'TypeError');
    assertException(function () { Region.create('id', 'img', {}, imgSize, difficultyPos); }, 'TypeError');
    assertException(function () { Region.create('id', 2, imgPos, imgSize, difficultyPos); }, 'TypeError');
  }
});