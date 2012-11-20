var ImageSelectionImageDiv = net.riemschneider.history.views.components.ImageSelectionImageDiv;
var Template = net.riemschneider.ui.Template;

TestCase('ImageSelectionImageDivTest', {
  setUp: function () {
    this.div = $('<div data-template-id="templateId"></div>');
    var innerDiv = $('<div></div>');
    innerDiv.append('<img data-id="image" data-attr="src" src="">');
    innerDiv.append('<div data-id="text" data-attr="text"></div>');
    innerDiv.append('<img data-id="overlay" data-attr="src" src="">');

    this.div.append(innerDiv);
    $('body').append(this.div);

    this.template = Template.create('templateId');
  },

  tearDown: function () {
    this.div.remove();
  },

  testCreateOnlyImage: function () {
    var optionDiv = ImageSelectionImageDiv.create(this.template, { image: '/test/images/test.png' });
    assertEquals(1, optionDiv.length);
    assertEquals('DIV', optionDiv[0].tagName);
    assertEquals(optionDiv.children()[0], 1, optionDiv.children().length);
    assertEquals('DIV', optionDiv.children()[0].tagName);
    assertEquals(1, optionDiv.children().children().length);
    assertEquals('IMG', optionDiv.children().children()[0].tagName);
  },

  testCreateWithName: function () {
    var optionDiv = ImageSelectionImageDiv.create(this.template, { image: '/test/images/test.png', text: 'Test' });
    assertEquals(1, optionDiv.length);
    assertEquals('DIV', optionDiv[0].tagName);
    assertEquals(1, optionDiv.children().length);
    assertEquals('DIV', optionDiv.children()[0].tagName);
    assertEquals(2, optionDiv.children().children().length);
    assertEquals('IMG', optionDiv.children().children()[0].tagName);
    assertEquals('DIV', optionDiv.children().children()[1].tagName);
    assertEquals('Test', $(optionDiv.children().children()[1]).text());
  },

  testCreateWithOverlay: function () {
    var optionDiv = ImageSelectionImageDiv.create(this.template, { image: '/test/images/test.png', text: 'Test', overlay: '/test/images/test.png' });
    assertEquals(1, optionDiv.length);
    assertEquals('DIV', optionDiv[0].tagName);
    assertEquals(1, optionDiv.children().length);
    assertEquals('DIV', optionDiv.children()[0].tagName);
    assertEquals(3, optionDiv.children().children().length);
    assertEquals('IMG', optionDiv.children().children()[0].tagName);
    assertEquals('DIV', optionDiv.children().children()[1].tagName);
    assertEquals('IMG', optionDiv.children().children()[2].tagName);
    assertEquals('Test', $(optionDiv.children().children()[1]).text());
  },

  testCreateWithImgOpacity: function () {
    var optionDiv = ImageSelectionImageDiv.create(this.template, { image: '/test/images/test.png', text: 'Test', overlay: '/test/images/test.png' }, 0.5);
    assertEquals(1, optionDiv.length);
    assertEquals('DIV', optionDiv[0].tagName);
    assertEquals(1, optionDiv.children().length);
    assertEquals('DIV', optionDiv.children()[0].tagName);
    assertEquals(3, optionDiv.children().children().length);
    assertEquals('IMG', optionDiv.children().children()[0].tagName);
    assertEquals('DIV', optionDiv.children().children()[1].tagName);
    assertEquals('IMG', optionDiv.children().children()[2].tagName);
    assertEquals('Test', $(optionDiv.children().children()[1]).text());
    assertEquals(0.5, $(optionDiv.children().children()[0]).css('opacity'));
  },

  testCreateNullAndTypeSafe: function () {
    var template = this.template;
    var data = { image: '' };

    assertException(function () { ImageSelectionImageDiv.create(template, null); }, 'TypeError');
    assertException(function () { ImageSelectionImageDiv.create(null, data); }, 'TypeError');

    assertException(function () { ImageSelectionImageDiv.create(template, 123); }, 'TypeError');
    assertException(function () { ImageSelectionImageDiv.create(template, {}); }, 'TypeError');
    assertException(function () { ImageSelectionImageDiv.create({}, data); }, 'TypeError');
    assertException(function () { ImageSelectionImageDiv.create(template, data, '1'); }, 'TypeError');
  }
});
