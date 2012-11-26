var JQueryTestUtils = net.riemschneider.testutils.JQueryTestUtils;
var Template = net.riemschneider.ui.Template;
var ImageSelectionTemplate = net.riemschneider.history.views.components.ImageSelectionTemplate;
var AvatarSelectionTemplate = net.riemschneider.history.views.AvatarSelectionTemplate;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;
var SetSrcAttributeProcessor = net.riemschneider.ui.SetSrcAttributeProcessor;
var ReplaceWithTemplateProcessor = net.riemschneider.ui.ReplaceWithTemplateProcessor;

TestCase('AvatarSelectionTemplateTest', {
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

    this.templateProcessorRegistry = TemplateProcessorRegistry.create();
    this.templateProcessorRegistry.addProcessor(ReplaceWithTemplateProcessor.create());
    this.templateProcessorRegistry.addProcessor(SetSrcAttributeProcessor.create());

    this.templates = {
      avatarImageSelectionTemplate: Template.create('avatar', this.templateProcessorRegistry),
      backgroundImageTemplate: Template.create('backgroundImage', this.templateProcessorRegistry),
      backgroundTemplate: Template.create('background', this.templateProcessorRegistry),
      imageSelectionTemplate: ImageSelectionTemplate.create('imageSelection', this.templateProcessorRegistry)
    };

    this.data = {
      imageSelection: {
        template: this.templates.imageSelectionTemplate,
        selectedImageIdx: 1,
        options: [ { template: this.templates.avatarImageSelectionTemplate, image: '1.png' }, { template: this.templates.avatarImageSelectionTemplate, image: '2.png' } ]
      },
      background: {
        template: this.templates.backgroundTemplate,
        imageTemplate: this.templates.backgroundImageTemplate,
        count: 3
      },
      selectedName: 'Anton',
      okCalled: false,
      onOkCallback: function onOk() {
        this.okCalled = true;
      }
    };
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreateNullAndTypeSafe: function () {
    var registry = this.templateProcessorRegistry;

    assertException(function () { AvatarSelectionTemplate.create('templateId', null); }, 'TypeError');
    assertException(function () { AvatarSelectionTemplate.create(null, registry); }, 'TypeError');

    assertException(function () { AvatarSelectionTemplate.create(12, registry); }, 'TypeError');
  },

  testClone: function () {
    var template = AvatarSelectionTemplate.create('viewTemplate', this.templateProcessorRegistry);
    var clone = template.clone(this.data);
    assertTrue(clone.hasClass('avatarSelection'));
    assertEquals('Anton', clone.find('.nameInput div input').val());
    assertEquals(2, clone.find('.imageClass').length);

    var selectedImage = clone.find('.imageSelectionSelector .imageClass');
    assertEquals(1, selectedImage.length);
    assertEquals('2.png', selectedImage.attr('src'));
  },

  testCloneNullAndTypeSafe: function () {
    var template = AvatarSelectionTemplate.create('viewTemplate', this.templateProcessorRegistry);
    var data = this.data;

    data.onOkCallback = null;
    assertException(function () { template.clone(data); }, 'TypeError');

    data.onOkCallback = 123;
    assertException(function () { template.clone(data); }, 'TypeError');
  },

  testGetName: function () {
    var template = AvatarSelectionTemplate.create('viewTemplate', this.templateProcessorRegistry);
    var clone = template.clone(this.data);
    clone.find('.nameInput div input').val('changed');
    assertEquals('changed', this.data.getName());
  },

  testOkCallsCallback: function () {
    var template = AvatarSelectionTemplate.create('viewTemplate', this.templateProcessorRegistry);
    var clone = template.clone(this.data);
    var okButton = clone.find('.okButton');
    okButton.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    okButton.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(this.data.okCalled);
  },

  testNameInputFocusIsLostWhenPressingReturn: function () {
    var template = AvatarSelectionTemplate.create('viewTemplate', this.templateProcessorRegistry);
    var clone = template.clone(this.data);
    var blurRecorder = JQueryTestUtils.startRecording('blur');
    var nameInput = clone.find('.nameInput div input');
    nameInput.trigger(jQuery.Event('keydown', { which: 13 }));
    JQueryTestUtils.stopRecording(blurRecorder);
    var lastRecording = JQueryTestUtils.getLastRecording(blurRecorder, function () { return true; });
    assertEquals(nameInput[0], lastRecording.obj[0]);
    JQueryTestUtils.clearRecording(blurRecorder);
  },

  testNameInputFocusIsLostWhenClickingSomewhere: function () {
    var template = AvatarSelectionTemplate.create('viewTemplate', this.templateProcessorRegistry);
    var clone = template.clone(this.data);
    var blurRecorder = JQueryTestUtils.startRecording('blur');
    $(document).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    JQueryTestUtils.stopRecording(blurRecorder);
    var lastRecording = JQueryTestUtils.getLastRecording(blurRecorder, function () { return true; });
    assertEquals(clone.find('.nameInput div input')[0], lastRecording.obj[0]);
    JQueryTestUtils.clearRecording(blurRecorder);
  }
});
