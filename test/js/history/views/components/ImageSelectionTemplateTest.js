var JQueryTestUtils = net.riemschneider.testutils.JQueryTestUtils;
var Template = net.riemschneider.ui.Template;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;
var ImageSelectionTemplate = net.riemschneider.history.views.components.ImageSelectionTemplate;

TestCase('ImageSelectionTemplateTest', {
  setUp: function () {
    $('body').empty();
    $('head').append($('<style type="text/css">.option { position: absolute; width: 150px; }</style>'));
    $('body').append($('<div data-template-id="template" class="container"></div>'));
    $('body').append($('<div data-template-id="optionTemplate" class="option"></div>'));

    this.cssRecorder = JQueryTestUtils.startRecording('css');
    JQueryTestUtils.clearRecording(this.cssRecorder);
    this.imageCountForScrolling = Math.floor(window.innerWidth / 150) + 2;
    this.scrollingOversize = this.imageCountForScrolling * 150 - window.innerWidth;

    this.templateProcessorRegistry = TemplateProcessorRegistry.create();
    this.optionTemplate = Template.create('optionTemplate', this.templateProcessorRegistry);

    this.options = [ { template: this.optionTemplate }, { template: this.optionTemplate } ];
  },

  tearDown: function () {
    $('body').empty();
    JQueryTestUtils.stopRecording(this.cssRecorder);
  },

  testCreateNullAndTypeSafe: function () {
    var registry = this.templateProcessorRegistry;

    assertException(function () { ImageSelectionTemplate.create('template', null); }, 'TypeError');
    assertException(function () { ImageSelectionTemplate.create(null, registry); }, 'TypeError');

    assertException(function () { ImageSelectionTemplate.create(12, registry); }, 'TypeError');
  },

  testCreateImagePlacement: function () {
    var template = ImageSelectionTemplate.create('template', this.templateProcessorRegistry);
    var container = template.clone({ options: this.options });
    assertEquals(1, container.length);
    var optionDivs = container.find('.option');
    assertEquals(2, optionDivs.length);
    assertEquals('0px', this.getLastRecording($(optionDivs[0])).args[0].left);
    assertEquals('150px', this.getLastRecording($(optionDivs[1])).args[0].left);
  },

  testDefaultSelection: function () {
    var template = ImageSelectionTemplate.create('template', this.templateProcessorRegistry);
    var container = template.clone({ options: this.options });
    assertNull(container.getSelection());
  },

  testSetSelection: function () {
    var template = ImageSelectionTemplate.create('template', this.templateProcessorRegistry);
    var container = template.clone({ options: this.options });
    container.setSelection(1);
    assertEquals(1, container.getSelection());
    var optionDivs = container.find('.option');
    assertFalse($(optionDivs[0]).hasClass('imageSelectionSelector'));
    assertTrue($(optionDivs[1]).hasClass('imageSelectionSelector'));
  },

  testTapSelectsImage: function () {
    var template = ImageSelectionTemplate.create('template', this.templateProcessorRegistry);
    var container = template.clone({ options: this.options });
    container.setSelection(0);
    var optionDivs = container.find('.option');
    assertEquals(2, optionDivs.length);
    $(optionDivs[1]).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    $(optionDivs[1]).trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertEquals(1, container.getSelection());
    assertFalse($(optionDivs[0]).hasClass('imageSelectionSelector'));
    assertTrue($(optionDivs[1]).hasClass('imageSelectionSelector'));
  },

  testTapCallsCallback: function () {
    var called = false;
    this.options[1].callback = function () { called = true; };
    var template = ImageSelectionTemplate.create('template', this.templateProcessorRegistry);
    var container = template.clone({ options: this.options });
    container.setSelection(0);
    var optionDivs = container.find('.option');
    assertEquals(2, optionDivs.length);
    $(optionDivs[1]).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    $(optionDivs[1]).trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  },

  testScrolling: function () {
    var template = ImageSelectionTemplate.create('template', this.templateProcessorRegistry);
    var container = template.clone({ options: this.createImagesForScrolling() });
    container.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 0 }));
    container.trigger(jQuery.Event('mousemove', { pageX: 100, pageY: 0 }));
    assertEquals(-20, this.getLastRecording(container).args[0].marginLeft);
  },

  testMaxScroll: function () {
    var template = ImageSelectionTemplate.create('template', this.templateProcessorRegistry);
    var container = template.clone({ options: this.createImagesForScrolling() });
    container.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 0 }));
    container.trigger(jQuery.Event('mousemove', { pageX: 121, pageY: 0 }));
    assertEquals(0, this.getLastRecording(container).args[0].marginLeft);
  },

  testMinScroll: function () {
    var template = ImageSelectionTemplate.create('template', this.templateProcessorRegistry);
    var container = template.clone({ options: this.createImagesForScrolling() });
    container.trigger(jQuery.Event('mousedown', { pageX: 200, pageY: 0 }));
    container.trigger(jQuery.Event('mousemove', { pageX: 0, pageY: 0 }));
    assertEquals(-this.scrollingOversize, this.getLastRecording(container).args[0].marginLeft);
  },

  getLastRecording: function getLastRecording(obj) {
    return JQueryTestUtils.getLastRecording(this.cssRecorder, JQueryTestUtils.matchRecordingByObj(obj));
  },

  createImagesForScrolling: function () {
    var images = [];
    for (var idx = 0; idx < this.imageCountForScrolling; ++idx) {
      images[idx] = { template: this.optionTemplate };
    }
    return images;
  }
});
