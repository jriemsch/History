var AvatarSelection = net.riemschneider.history.views.AvatarSelection;
var JQueryTestUtils = net.riemschneider.testutils.JQueryTestUtils;
var Template = net.riemschneider.ui.Template;
var ImageSelectionTemplate = net.riemschneider.history.views.components.ImageSelectionTemplate;
var AvatarSelectionTemplate = net.riemschneider.history.views.AvatarSelectionTemplate;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;
var SetSrcAttributeProcessor = net.riemschneider.ui.SetSrcAttributeProcessor;
var ReplaceWithTemplateProcessor = net.riemschneider.ui.ReplaceWithTemplateProcessor;

TestCase('AvatarSelectionTest', {
  setUp: function () {
    $('body').empty();

    this.viewTemplateDiv = $('<div class="avatarSelection" data-template-id="viewTemplate"></div>');
    this.viewTemplateDiv.append('<div class="avatars" data-replace-with-template="imageSelection"></div>');
    this.viewTemplateDiv.append('<div class="avatarQuestionMarksTop"></div>');
    this.viewTemplateDiv.append('<div class="avatarQuestionMarksBottom"></div>');
    this.viewTemplateDiv.append('<div class="nameInput"><div><input type="text"></div></div>');
    this.viewTemplateDiv.append('<div class="footer"><div class="okButton"></div></div>');

    $('body').append('<div data-template-id="avatar"><img data-attr-src="image" class="imageClass"></div>');
    $('body').append('<img data-template-id="backgroundImage">');
    $('body').append('<div data-template-id="background"></div>');
    $('body').append('<div data-template-id="imageSelection" class="container"></div>');
    $('body').append(this.viewTemplateDiv);

    this.parent = $('<div></div>');
    $('body').append(this.parent);

    this.templateProcessorRegistry = TemplateProcessorRegistry.create();
    this.templateProcessorRegistry.addProcessor(ReplaceWithTemplateProcessor.create());
    this.templateProcessorRegistry.addProcessor(SetSrcAttributeProcessor.create());

    this.templates = {
      avatarImageSelectionTemplate: Template.create('avatar', this.templateProcessorRegistry),
      backgroundImageTemplate: Template.create('backgroundImage', this.templateProcessorRegistry),
      backgroundTemplate: Template.create('background', this.templateProcessorRegistry),
      imageSelectionTemplate: ImageSelectionTemplate.create('imageSelection', this.templateProcessorRegistry),
      avatarSelectionTemplate: AvatarSelectionTemplate.create('viewTemplate', this.templateProcessorRegistry)
    };
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreateNullAndTypeSafe: function () {
    var templates = this.templates;
    var parent = this.parent;

    assertException(function () { AvatarSelection.create(parent, null); }, 'TypeError');
    assertException(function () { AvatarSelection.create(null, templates); }, 'TypeError');

    assertException(function () { AvatarSelection.create(parent, {}); }, 'TypeError');
  },

  testShowAndHide: function () {
    var sel = AvatarSelection.create(this.parent, this.templates);
    assertEquals(0, this.parent.find('.avatarSelection').length);
    sel.show();
    assertEquals(1, this.parent.find('.avatarSelection').length);
    sel.hide();
    assertEquals(0, this.parent.find('.avatarSelection').length);
  },

  testPreviousNameIsShown: function () {
    var sel = AvatarSelection.create(this.parent, this.templates);
    sel.setName('initial');
    sel.show();
    assertEquals('initial', this.parent.find('.nameInput div input').val());
  },

  testSelectName: function () {
    var sel = AvatarSelection.create(this.parent, this.templates);
    sel.show();
    this.parent.find('.nameInput div input').val('changed');
    assertEquals('changed', sel.getName());
  },

  testAllImagesShown: function () {
    var sel = AvatarSelection.create(this.parent, this.templates);
    sel.show();
    assertEquals(31, this.parent.find('.imageClass').length);
  },

  testPreviousImageIsSelected: function () {
    var sel = AvatarSelection.create(this.parent, this.templates);
    sel.setAvatarImageIdx(2);
    sel.show();
    var selectedImage = this.parent.find('.imageSelectionSelector .imageClass');
    assertEquals(1, selectedImage.length);
    assertEquals('images/avatars/avatar002.png', selectedImage.attr('src'));
  },

  testSelectImage: function () {
    var sel = AvatarSelection.create(this.parent, this.templates);
    sel.show();
    var allImages = this.parent.find('.imageClass');
    $(allImages[1]).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    $(allImages[1]).trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertEquals(1, sel.getAvatarImageIdx());
  },

  testOkCallsCallback: function () {
    var sel = AvatarSelection.create(this.parent, this.templates);
    var called = false;
    sel.onOk(function () { called = true; });
    sel.show();
    var okButton = this.parent.find('.okButton');
    okButton.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    okButton.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  },

  testNameInputFocusIsLostWhenPressingReturn: function () {
    var sel = AvatarSelection.create(this.parent, this.templates);
    sel.show();
    var blurRecorder = JQueryTestUtils.startRecording('blur');
    var nameInput = this.parent.find('.nameInput div input');
    nameInput.trigger(jQuery.Event('keydown', { which: 13 }));
    JQueryTestUtils.stopRecording(blurRecorder);
    var lastRecording = JQueryTestUtils.getLastRecording(blurRecorder, function () { return true; });
    assertEquals(nameInput[0], lastRecording.obj[0]);
    JQueryTestUtils.clearRecording(blurRecorder);
  },

  testNameInputFocusIsLostWhenClickingSomewhere: function () {
    var sel = AvatarSelection.create(this.parent, this.templates);
    sel.show();
    var blurRecorder = JQueryTestUtils.startRecording('blur');
    $(document).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    JQueryTestUtils.stopRecording(blurRecorder);
    var lastRecording = JQueryTestUtils.getLastRecording(blurRecorder, function () { return true; });
    assertEquals(this.parent.find('.nameInput div input')[0], lastRecording.obj[0]);
    JQueryTestUtils.clearRecording(blurRecorder);
  }
});
