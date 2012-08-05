var ImageSelection = net.riemschneider.history.views.components.ImageSelection;

TestCase('ImageSelectionTest', {
  setUp: function () {
    $('body').empty();
    var css = $('<style type="text/css">' +
        '.imageSelectionOptionImage { width: 100px; } ' +
        '.imageSelectionOption { position: absolute; } ' +
        '.imageSelectionOptionContainer { position: absolute; }' +
        '</style>');
    $('head').append(css);
    this.cssRecorder = JQueryTestUtils.startRecording('css');
    JQueryTestUtils.clearRecording(this.cssRecorder);
    this.imageCountForScrolling = Math.floor(window.innerWidth / 150) + 2;
    this.scrollingOversize = this.imageCountForScrolling * 150 - window.innerWidth;
  },

  tearDown: function () {
    $('body').empty();
    JQueryTestUtils.stopRecording(this.cssRecorder);
  },

  testCreateImagePlacement: function () {
    ImageSelection.create($('body'), [{ imgSrc: '/test/images/test.png' }, { imgSrc: '/test/images/test.png' }]);
    var container = $('body').find('.imageSelectionOptionContainer');
    assertEquals(1, container.length);
    var optionDivs = container.find('.imageSelectionOption');
    assertEquals(2, optionDivs.length);
    assertEquals('0px', this.getLastRecording($(optionDivs[0])).arguments[0].left);
    assertEquals('150px', this.getLastRecording($(optionDivs[1])).arguments[0].left);
  },

  testDefaultSelection: function () {
    var sel = ImageSelection.create($('body'), [{ imgSrc: '/test/images/test.png' }, { imgSrc: '/test/images/test.png' }]);
    assertNull(sel.getSelection());
  },

  testSetSelection: function () {
    var sel = ImageSelection.create($('body'), [{ imgSrc: '/test/images/test.png' }, { imgSrc: '/test/images/test.png' }]);
    sel.setSelection(1);
    assertEquals(1, sel.getSelection());
    var images = $('body').find('.imageSelectionOptionContainer .imageSelectionOptionImage');
    assertFalse($(images[0]).hasClass('imageSelectionSelector'));
    assertTrue($(images[1]).hasClass('imageSelectionSelector'));
  },

  testTapSelectsImage: function () {
    var sel = ImageSelection.create($('body'), [{ imgSrc: '/test/images/test.png' }, { imgSrc: '/test/images/test.png' }]);
    sel.setSelection(0);
    var images = $('body').find('.imageSelectionOptionContainer .imageSelectionOptionImage');
    assertEquals(2, images.length);
    $(images[1]).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    $(images[1]).trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertEquals(1, sel.getSelection());
    assertFalse($(images[0]).hasClass('imageSelectionSelector'));
    assertTrue($(images[1]).hasClass('imageSelectionSelector'));
  },

  testScrolling: function () {
    ImageSelection.create($('body'), this.createImagesForScrolling());
    var container = $('body').find('.imageSelectionOptionContainer');
    container.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 0 }));
    container.trigger(jQuery.Event('mousemove', { pageX: 100, pageY: 0 }));
    assertEquals(-20, this.getLastRecording(container).arguments[0].marginLeft);
  },

  testMaxScroll: function () {
    ImageSelection.create($('body'), this.createImagesForScrolling());
    var container = $('body').find('.imageSelectionOptionContainer');
    container.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 0 }));
    container.trigger(jQuery.Event('mousemove', { pageX: 121, pageY: 0 }));
    assertEquals(0, this.getLastRecording(container).arguments[0].marginLeft);
  },

  testMinScroll: function () {
    ImageSelection.create($('body'), this.createImagesForScrolling());
    var container = $('body').find('.imageSelectionOptionContainer');
    container.trigger(jQuery.Event('mousedown', { pageX: 200, pageY: 0 }));
    container.trigger(jQuery.Event('mousemove', { pageX: 0, pageY: 0 }));
    assertEquals(-this.scrollingOversize, this.getLastRecording(container).arguments[0].marginLeft);
  },

  getLastRecording: function getLastRecording(obj) {
    return JQueryTestUtils.getLastRecording(this.cssRecorder, JQueryTestUtils.matchRecordingByObj(obj));
  },

  createImagesForScrolling:function () {
    var images = [];
    for (var idx = 0; idx < this.imageCountForScrolling; ++idx) {
      images[idx] = { imgSrc:'/test/images/test.png' };
    }
    return images;
  }
});
