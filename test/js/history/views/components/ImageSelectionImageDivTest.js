var ImageSelectionImageDiv = net.riemschneider.history.views.components.ImageSelectionImageDiv;

TestCase('ImageSelectionImageDivTest', {
  testCreateOnlyImage: function () {
    var optionDiv = ImageSelectionImageDiv.create('/test/images/test.png');
    assertEquals(1, optionDiv.length);
    assertEquals('DIV', optionDiv[0].tagName);
    assertEquals(1, optionDiv.children().length);
    assertEquals('IMG', optionDiv.children()[0].tagName);
  },

  testCreateWithName: function () {
    var optionDiv = ImageSelectionImageDiv.create('/test/images/test.png', 'Test');
    assertEquals(1, optionDiv.length);
    assertEquals('DIV', optionDiv[0].tagName);
    assertEquals(2, optionDiv.children().length);
    assertEquals('IMG', optionDiv.children()[0].tagName);
    assertEquals('DIV', optionDiv.children()[1].tagName);
    assertEquals('Test', $(optionDiv.children()[1]).text());
  },

  testCreateWithOverlay: function () {
    var optionDiv = ImageSelectionImageDiv.create('/test/images/test.png', 'Test', '/test/images/test.png');
    assertEquals(1, optionDiv.length);
    assertEquals('DIV', optionDiv[0].tagName);
    assertEquals(3, optionDiv.children().length);
    assertEquals('IMG', optionDiv.children()[0].tagName);
    assertEquals('DIV', optionDiv.children()[1].tagName);
    assertEquals('IMG', optionDiv.children()[2].tagName);
    assertEquals('Test', $(optionDiv.children()[1]).text());
  },

  testCreateWithImgOpacity: function () {
    var optionDiv = ImageSelectionImageDiv.create('/test/images/test.png', 'Test', '/test/images/test.png', 0.5);
    assertEquals(1, optionDiv.length);
    assertEquals('DIV', optionDiv[0].tagName);
    assertEquals(3, optionDiv.children().length);
    assertEquals('IMG', optionDiv.children()[0].tagName);
    assertEquals(0.5, $(optionDiv.children()[0]).css('opacity'));
    assertEquals('DIV', optionDiv.children()[1].tagName);
    assertEquals('IMG', optionDiv.children()[2].tagName);
    assertEquals('Test', $(optionDiv.children()[1]).text());
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { ImageSelectionImageDiv.create(null); }, 'TypeError');

    assertException(function () { ImageSelectionImageDiv.create('test', 123); }, 'TypeError');
    assertException(function () { ImageSelectionImageDiv.create('test', 'test', 123); }, 'TypeError');
    assertException(function () { ImageSelectionImageDiv.create('test', 'test', 'test', 'bla'); }, 'TypeError');
  }
});
