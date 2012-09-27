var ImageMap = net.riemschneider.history.views.components.ImageMap;
var TypeUtils = net.riemschneider.utils.TypeUtils;
var Position = net.riemschneider.graphics.Position;

TestCase('ImageMapTest', {
  setUp: function () {
    this.imgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AkbBTUx1gTEfAAAABFJREFUCNdj+P///38GBgYGABnvA/2GA2UfAAAAAElFTkSuQmCC';
    this.imgSize = Position.create(2, 1);
    this.imgPos = Position.create(0, 0);

    $('body').empty();

    this.parent = $('<div></div>');
    $('body').append(this.parent);
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreate: function () {
    var imageMap = ImageMap.create(this.parent);
    assertNotUndefined(imageMap);
    assertTrue(TypeUtils.isOfType(imageMap, ImageMap));
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { ImageMap.create(null); });
  },

  testAddImage: function () {
    var imageMap = ImageMap.create(this.parent);
    var image = imageMap.addImage(this.imgSrc, this.imgPos, this.imgSize, function () {});
    assertNotUndefined(image);
    assertEquals(1, this.parent.children().length);
    assertEquals(1, this.parent.children().children().length);
  },

  testAddImageNullAndTypeSafe: function () {
    var imageMap = ImageMap.create(this.parent);
    var imgSrc = this.imgSrc;
    var imgSize = this.imgSize;
    var imgPos = this.imgPos;

    assertException(function () { imageMap.addImage(imgSrc, imgPos, imgSize, null); });
    assertException(function () { imageMap.addImage(imgSrc, imgPos, null, function () {}); });
    assertException(function () { imageMap.addImage(imgSrc, null, imgSize, function () {}); });
    assertException(function () { imageMap.addImage(null, imgPos, imgSize, function () {}); });

    assertException(function () { imageMap.addImage(imgSrc, imgPos, imgSize, {}); });
    assertException(function () { imageMap.addImage(imgSrc, imgPos, {}, function () {}); });
    assertException(function () { imageMap.addImage(imgSrc, {}, imgSize, function () {}); });
    assertException(function () { imageMap.addImage(123, imgPos, imgSize, function () {}); });
  },

  testAddImageClass: function () {
    var imageMap = ImageMap.create(this.parent);
    var image = imageMap.addImage(this.imgSrc, this.imgPos, this.imgSize, function () {});
    image.addImageClass('imageClass');
    assertEquals(1, this.parent.find('.imageClass').length);
  },

  testAddMaskClass: function () {
    var imageMap = ImageMap.create(this.parent);
    var image = imageMap.addImage(this.imgSrc, this.imgPos, this.imgSize, function () {});
    image.addMaskClass('maskClass');
    assertEquals(1, this.parent.find('.maskClass').length);
  },

  testDestroy: function () {
    var imageMap = ImageMap.create(this.parent);
    imageMap.addImage(this.imgSrc, this.imgPos, this.imgSize, function () {});
    imageMap.destroy();
    assertEquals(0, this.parent.children().length);
  },

  testTapInFilledArea: function () {
    var imageMap = ImageMap.create(this.parent);
    var called = false;
    imageMap.addImage(this.imgSrc, Position.create(0, 0), this.imgSize, function () {
      called = true;
    });
    this.parent.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    this.parent.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  },

  testTapInTransparentArea: function () {
    var imageMap = ImageMap.create(this.parent);
    var called = false;
    imageMap.addImage(this.imgSrc, Position.create(1, 0), this.imgSize, function () {
      called = true;
    });
    this.parent.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    this.parent.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertFalse(called);
  }
});