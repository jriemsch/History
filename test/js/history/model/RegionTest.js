var Region = net.riemschneider.history.model.Region;
var Position = net.riemschneider.graphics.Position;

TestCase('RegionTest', {
  testCreate: function () {
    var imgPos = Position.create(1, 2);
    var region = Region.create('id', 'img', imgPos);
    assertEquals('id', region.getId());
    assertEquals('img', region.getImgSrc());
    assertSame(imgPos, region.getImgPos());
  },

  testNullAndTypeSafe: function () {
    var imgPos = Position.create(1, 2);
    assertException(function () { Region.create('id', 'img', null); }, 'TypeError');
    assertException(function () { Region.create('id', null, imgPos); }, 'TypeError');
    assertException(function () { Region.create(null, 'img', imgPos); }, 'TypeError');

    assertException(function () { Region.create('id', 'img', {}); }, 'TypeError');
    assertException(function () { Region.create('id', 2, imgPos); }, 'TypeError');
  }
});