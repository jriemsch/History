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
    assertEquals(1, region.getImgPos().getX());
    assertEquals(2, region.getImgPos().getY());
    assertEquals(10, region.getImgSize().getX());
    assertEquals(20, region.getImgSize().getY());
    assertEquals(3, region.getDifficultyPos().getX());
    assertEquals(4, region.getDifficultyPos().getY());
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
    assertException(function () { Region.create(2, 'img', imgPos, imgSize, difficultyPos); }, 'TypeError');
  },

  testCreateFromState: function () {
    var difficultyPos = { x: 3, y: 4 };
    var imgSize = { x: 10, y: 20 };
    var imgPos = { x: 1, y: 2 };
    var region = Region.createFromState({ id: 'id', imgSrc: 'img', imgPos: imgPos, imgSize: imgSize, difficultyPos: difficultyPos });
    assertTrue(TypeUtils.isOfType(region, Region));
    assertEquals('id', region.getId());
    assertEquals('img', region.getImgSrc());
    assertEquals(1, region.getImgPos().getX());
    assertEquals(2, region.getImgPos().getY());
    assertEquals(10, region.getImgSize().getX());
    assertEquals(20, region.getImgSize().getY());
    assertEquals(3, region.getDifficultyPos().getX());
    assertEquals(4, region.getDifficultyPos().getY());
  },

  testCreateFromStateNullAndTypeSafe: function () {
    var difficultyPos = { x: 3, y: 4 };
    var imgSize = { x: 10, y: 20 };
    var imgPos = { x: 1, y: 2 };

    assertException(function () { Region.createFromState(null); }, 'TypeError');

    assertException(function () { Region.createFromState({ id: 'id', imgSrc: 'img', imgPos: imgPos, imgSize: imgSize }); }, 'TypeError');
    assertException(function () { Region.createFromState({ id: 'id', imgSrc: 'img', imgPos: imgPos, difficultyPos: difficultyPos }); }, 'TypeError');
    assertException(function () { Region.createFromState({ id: 'id', imgSrc: 'img', imgSize: imgSize, difficultyPos: difficultyPos }); }, 'TypeError');
    assertException(function () { Region.createFromState({ id: 'id', imgPos: imgPos, imgSize: imgSize, difficultyPos: difficultyPos }); }, 'TypeError');
    assertException(function () { Region.createFromState({ imgSrc: 'img', imgPos: imgPos, imgSize: imgSize, difficultyPos: difficultyPos }); }, 'TypeError');

    assertException(function () { Region.createFromState({ id: 'id', imgSrc: 'img', imgPos: imgPos, imgSize: imgSize, difficultyPos: 12 }); }, 'TypeError');
    assertException(function () { Region.createFromState({ id: 'id', imgSrc: 'img', imgPos: imgPos, imgSize: 12, difficultyPos: difficultyPos }); }, 'TypeError');
    assertException(function () { Region.createFromState({ id: 'id', imgSrc: 'img', imgPos: 12, imgSize: imgSize, difficultyPos: difficultyPos }); }, 'TypeError');
    assertException(function () { Region.createFromState({ id: 'id', imgSrc: 12, imgPos: imgPos, imgSize: imgSize, difficultyPos: difficultyPos }); }, 'TypeError');
    assertException(function () { Region.createFromState({ id: 12, imgSrc: 'img', imgPos: imgPos, imgSize: imgSize, difficultyPos: difficultyPos }); }, 'TypeError');
  }
});