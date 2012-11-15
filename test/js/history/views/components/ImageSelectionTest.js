var ImageSelection = net.riemschneider.history.views.components.ImageSelection;
var JQueryTestUtils = net.riemschneider.testutils.JQueryTestUtils;

TestCase('ImageSelectionTest', {
  setUp: function () {
    $('body').empty();
    var css = $('<style type="text/css">' +
        '.imageSelectionOption { position: absolute; width: 150px; } ' +
        '.imageSelectionOptionContainer { position: absolute; }' +
        '</style>');
    $('head').append(css);
    this.cssRecorder = JQueryTestUtils.startRecording('css');
    JQueryTestUtils.clearRecording(this.cssRecorder);
    this.imageCountForScrolling = Math.floor(window.innerWidth / 150) + 2;
    this.scrollingOversize = this.imageCountForScrolling * 150 - window.innerWidth;
    this.options = [
      { div: $('<div class="imageSelectionOption"></div>') },
      { div: $('<div class="imageSelectionOption"></div>') }
    ];
  },

  tearDown: function () {
    $('body').empty();
    JQueryTestUtils.stopRecording(this.cssRecorder);
  },

  testCreateImagePlacement: function () {
    ImageSelection.create($('body'), this.options);
    var container = $('body').find('.imageSelectionOptionContainer');
    assertEquals(1, container.length);
    var optionDivs = container.find('.imageSelectionOption');
    assertEquals(2, optionDivs.length);
    assertEquals('0px', this.getLastRecording($(optionDivs[0])).args[0].left);
    assertEquals('150px', this.getLastRecording($(optionDivs[1])).args[0].left);
  },

  testDestroy: function () {
    var sel = ImageSelection.create($('body'), this.options);
    sel.destroy();
    assertEquals(0, $('body').find('.imageSelectionOptionContainer').length);
  },

  testDefaultSelection: function () {
    var sel = ImageSelection.create($('body'), this.options);
    assertNull(sel.getSelection());
  },

  testSetSelection: function () {
    var sel = ImageSelection.create($('body'), this.options);
    sel.setSelection(1);
    assertEquals(1, sel.getSelection());
    var optionDivs = $('body').find('.imageSelectionOptionContainer .imageSelectionOption');
    assertFalse($(optionDivs[0]).hasClass('imageSelectionSelector'));
    assertTrue($(optionDivs[1]).hasClass('imageSelectionSelector'));
  },

  testTapSelectsImage: function () {
    var sel = ImageSelection.create($('body'), this.options);
    sel.setSelection(0);
    var optionDivs = $('body').find('.imageSelectionOptionContainer .imageSelectionOption');
    assertEquals(2, optionDivs.length);
    $(optionDivs[1]).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    $(optionDivs[1]).trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertEquals(1, sel.getSelection());
    assertFalse($(optionDivs[0]).hasClass('imageSelectionSelector'));
    assertTrue($(optionDivs[1]).hasClass('imageSelectionSelector'));
  },

  testTapCallsCallback: function () {
    var called = false;
    this.options[1].callback = function () { called = true; };
    var sel = ImageSelection.create($('body'), this.options);
    sel.setSelection(0);
    var optionDivs = $('body').find('.imageSelectionOptionContainer .imageSelectionOption');
    assertEquals(2, optionDivs.length);
    $(optionDivs[1]).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    $(optionDivs[1]).trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  },

  testScrolling: function () {
    ImageSelection.create($('body'), this.createImagesForScrolling());
    var container = $('body').find('.imageSelectionOptionContainer');
    container.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 0 }));
    container.trigger(jQuery.Event('mousemove', { pageX: 100, pageY: 0 }));
    assertEquals(-20, this.getLastRecording(container).args[0].marginLeft);
  },

  testMaxScroll: function () {
    ImageSelection.create($('body'), this.createImagesForScrolling());
    var container = $('body').find('.imageSelectionOptionContainer');
    container.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 0 }));
    container.trigger(jQuery.Event('mousemove', { pageX: 121, pageY: 0 }));
    assertEquals(0, this.getLastRecording(container).args[0].marginLeft);
  },

  testMinScroll: function () {
    ImageSelection.create($('body'), this.createImagesForScrolling());
    var container = $('body').find('.imageSelectionOptionContainer');
    container.trigger(jQuery.Event('mousedown', { pageX: 200, pageY: 0 }));
    container.trigger(jQuery.Event('mousemove', { pageX: 0, pageY: 0 }));
    assertEquals(-this.scrollingOversize, this.getLastRecording(container).args[0].marginLeft);
  },

  getLastRecording: function getLastRecording(obj) {
    return JQueryTestUtils.getLastRecording(this.cssRecorder, JQueryTestUtils.matchRecordingByObj(obj));
  },

  createImagesForScrolling:function () {
    var images = [];
    for (var idx = 0; idx < this.imageCountForScrolling; ++idx) {
      images[idx] = { div: $('<div class="imageSelectionOption"></div>') };
    }
    return images;
  }
});
