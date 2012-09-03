var Region = net.riemschneider.history.model.Region;
var Position = net.riemschneider.graphics.Position;

TestCase('RegionTest', {
  testCreate: function () {
    var imgPos = Position.create(1, 2);
    var difficultyPos = Position.create(3, 4);
    var region = Region.create('id', 'img', imgPos, difficultyPos);
    assertEquals('id', region.getId());
    assertEquals('img', region.getImgSrc());
    assertSame(imgPos, region.getImgPos());
    assertSame(difficultyPos, region.getDifficultyPos());
  },

  testNullAndTypeSafe: function () {
    var imgPos = Position.create(1, 2);
    var difficultyPos = Position.create(3, 4);

    assertException(function () { Region.create('id', 'img', imgPos, null); }, 'TypeError');
    assertException(function () { Region.create('id', 'img', null, difficultyPos); }, 'TypeError');
    assertException(function () { Region.create('id', null, imgPos, difficultyPos); }, 'TypeError');
    assertException(function () { Region.create(null, 'img', imgPos, difficultyPos); }, 'TypeError');

    assertException(function () { Region.create('id', 'img', imgPos, {}); }, 'TypeError');
    assertException(function () { Region.create('id', 'img', {}, difficultyPos); }, 'TypeError');
    assertException(function () { Region.create('id', 2, imgPos, difficultyPos); }, 'TypeError');
  }
});