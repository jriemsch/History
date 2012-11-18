var ImageSelectionMultipleImagesDiv = net.riemschneider.history.views.components.ImageSelectionMultipleImagesDiv;
var Opponent = net.riemschneider.history.model.Opponent;

TestCase('ImageSelectionMultipleImagesDivTest', {
  setUp: function () {
    this.imageInfos = [ { avatarImageIdx: 0, name: 'Hans' }, { avatarImageIdx: 1, name: 'Sepp' } ];
  },

  testCreate: function () {
    var optionDiv = ImageSelectionMultipleImagesDiv.create(this.imageInfos, 'yellowGlow');
    assertEquals(1, optionDiv.length);
    assertEquals('DIV', optionDiv[0].tagName);
    assertEquals(3, optionDiv.children().length);
    assertEquals('DIV', optionDiv.children()[0].tagName);
    assertEquals('DIV', optionDiv.children()[1].tagName);
    assertEquals('DIV', optionDiv.children()[2].tagName);
    assertEquals(4, optionDiv.children().children().length);
    assertEquals('IMG', optionDiv.children().children()[0].tagName);
    assertEquals('DIV', optionDiv.children().children()[1].tagName);
    assertEquals('IMG', optionDiv.children().children()[2].tagName);
    assertEquals('DIV', optionDiv.children().children()[3].tagName);
    assertEquals(2, optionDiv.children().children().children().length);
    assertEquals('Hans', $(optionDiv.children().children().children()[0]).text());
    assertEquals('Sepp', $(optionDiv.children().children().children()[1]).text());
  },

  testCreateNullAndTypeSafe: function () {
    var imageInfos = this.imageInfos;

    assertException(function () { ImageSelectionMultipleImagesDiv.create(imageInfos, null); }, 'TypeError');
    assertException(function () { ImageSelectionMultipleImagesDiv.create(null, 'yellowGlow'); }, 'TypeError');

    assertException(function () { ImageSelectionMultipleImagesDiv.create(imageInfos, 1); }, 'TypeError');
    assertException(function () { ImageSelectionMultipleImagesDiv.create([ imageInfos[0], {} ], 'yellowGlow'); }, 'TypeError');
    assertException(function () { ImageSelectionMultipleImagesDiv.create([ {}, imageInfos[1] ], 'yellowGlow'); }, 'TypeError');

    assertException(function () { ImageSelectionMultipleImagesDiv.create({ avatarImageIdx: 1 }, 'yellowGlow'); }, 'TypeError');
    assertException(function () { ImageSelectionMultipleImagesDiv.create({ name: 'Sepp' }, 'yellowGlow'); }, 'TypeError');

    assertException(function () { ImageSelectionMultipleImagesDiv.create({ avatarImageIdx: -1 }, 'yellowGlow'); }, 'TypeError');
    assertException(function () { ImageSelectionMultipleImagesDiv.create({ avatarImageIdx: 30 }, 'yellowGlow'); }, 'TypeError');
    assertException(function () { ImageSelectionMultipleImagesDiv.create({ avatarImageIdx: '1' }, 'yellowGlow'); }, 'TypeError');
    assertException(function () { ImageSelectionMultipleImagesDiv.create({ name: 2 }, 'yellowGlow'); }, 'TypeError');
  }
});
