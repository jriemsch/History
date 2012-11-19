var Region = net.riemschneider.history.model.Region;
var Position = net.riemschneider.graphics.Position;
var ImageData = net.riemschneider.graphics.ImageData;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('RegionTest', {
  testCreate: function () {
    var imgPos = Position.create(1, 2);
    var imgSize = Position.create(10, 20);
    var difficultyPos = Position.create(3, 4);
    var imgData = ImageData.create('img', imgPos, imgSize);
    var region = Region.create('id', imgData, difficultyPos);
    assertTrue(TypeUtils.isOfType(region, Region));
    assertEquals('id', region.getId());
    assertEquals('img', region.getImgData().getImgSrc());
    assertEquals(1, region.getImgData().getImgPos().getX());
    assertEquals(2, region.getImgData().getImgPos().getY());
    assertEquals(10, region.getImgData().getImgSize().getX());
    assertEquals(20, region.getImgData().getImgSize().getY());
    assertEquals(3, region.getDifficultyPos().getX());
    assertEquals(4, region.getDifficultyPos().getY());
  },

  testNullAndTypeSafe: function () {
    var imgPos = Position.create(1, 2);
    var imgSize = Position.create(10, 20);
    var difficultyPos = Position.create(3, 4);
    var imgData = ImageData.create('img', imgPos, imgSize);

    assertException(function () { Region.create('id', imgData, null); }, 'TypeError');
    assertException(function () { Region.create('id', null, difficultyPos); }, 'TypeError');
    assertException(function () { Region.create(null, imgData, difficultyPos); }, 'TypeError');

    assertException(function () { Region.create('id', imgData, {}); }, 'TypeError');
    assertException(function () { Region.create('id', 2, difficultyPos); }, 'TypeError');
    assertException(function () { Region.create(2, imgData, difficultyPos); }, 'TypeError');
  },

  testCreateFromState: function () {
    var difficultyPos = { x: 3, y: 4 };
    var imgSize = { x: 10, y: 20 };
    var imgPos = { x: 1, y: 2 };
    var region = Region.createFromState({ id: 'id', imgSrc: 'img', imgPos: imgPos, imgSize: imgSize, difficultyPos: difficultyPos });
    assertTrue(TypeUtils.isOfType(region, Region));
    assertEquals('id', region.getId());
    assertEquals('img', region.getImgData().getImgSrc());
    assertEquals(1, region.getImgData().getImgPos().getX());
    assertEquals(2, region.getImgData().getImgPos().getY());
    assertEquals(10, region.getImgData().getImgSize().getX());
    assertEquals(20, region.getImgData().getImgSize().getY());
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