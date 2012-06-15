var ImageSelection = net.riemschneider.history.views.components.ImageSelection;

TestCase('ImageSelectionTest', {
  setUp: function () {
    $('body').empty();
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreate: function () {
    var sel = ImageSelection.create($('body'), [{ imgSrc: '/test/images/test.png' }]);
  }
});
