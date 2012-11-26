var TopicSelectionTemplate = net.riemschneider.history.views.TopicSelectionTemplate;
var Template = net.riemschneider.ui.Template;
var ImageSelectionTemplate = net.riemschneider.history.views.components.ImageSelectionTemplate;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;
var SetSrcAttributeProcessor = net.riemschneider.ui.SetSrcAttributeProcessor;
var ReplaceWithTemplateProcessor = net.riemschneider.ui.ReplaceWithTemplateProcessor;

TestCase('TopicSelectionTemplateTest', {
  setUp: function () {
    $('body').empty();

    this.viewTemplateDiv = $('<div class="topicSelection" data-template-id="viewTemplate"></div>');
    this.viewTemplateDiv.append('<div class="topics" data-replace-with-template="imageSelection"></div>');
    this.viewTemplateDiv.append('<div class="topicQuestionMarksTop"></div>');
    this.viewTemplateDiv.append('<div class="topicQuestionMarksBottom"></div>');
    this.viewTemplateDiv.append('<div class="nameInput"><div><input type="text"></div></div>');
    this.viewTemplateDiv.append('<div class="footer"><div class="backButton"></div></div>');

    $('body').append('<div data-template-id="image"><img data-attr-src="image" class="imageClass"></div>');
    $('body').append('<img data-template-id="backgroundImage">');
    $('body').append('<div data-template-id="background"></div>');
    $('body').append('<div data-template-id="imageSelection" class="container"></div>');
    $('body').append(this.viewTemplateDiv);

    this.templateProcessorRegistry = TemplateProcessorRegistry.create();
    this.templateProcessorRegistry.addProcessor(ReplaceWithTemplateProcessor.create());
    this.templateProcessorRegistry.addProcessor(SetSrcAttributeProcessor.create());

    this.templates = {
      imageTemplate: Template.create('image', this.templateProcessorRegistry),
      backgroundImageTemplate: Template.create('backgroundImage', this.templateProcessorRegistry),
      backgroundTemplate: Template.create('background', this.templateProcessorRegistry),
      imageSelectionTemplate: ImageSelectionTemplate.create('imageSelection', this.templateProcessorRegistry)
    };

    this.data = {
      imageSelection: {
        template: this.templates.imageSelectionTemplate,
        options: [ { template: this.templates.imageTemplate, image: '1.png' }, { template: this.templates.imageTemplate, image: '2.png' } ]
      },
      background: {
        template: this.templates.backgroundTemplate,
        imageTemplate: this.templates.backgroundImageTemplate,
        count: 3
      },
      selectedName: 'Anton',
      backCalled: false,
      onBackCallback: function onBack() {
        this.backCalled = true;
      }
    };
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreateNullAndTypeSafe: function () {
    var registry = this.templateProcessorRegistry;

    assertException(function () { TopicSelectionTemplate.create('templateId', null); }, 'TypeError');
    assertException(function () { TopicSelectionTemplate.create(null, registry); }, 'TypeError');

    assertException(function () { TopicSelectionTemplate.create(12, registry); }, 'TypeError');
  },

  testClone: function () {
    var template = TopicSelectionTemplate.create('viewTemplate', this.templateProcessorRegistry);
    var clone = template.clone(this.data);
    assertTrue(clone.hasClass('topicSelection'));
    assertEquals(2, clone.find('.imageClass').length);

    assertEquals(0, clone.find('.imageSelectionSelector .imageClass').length);
  },

  testCloneNullAndTypeSafe: function () {
    var template = TopicSelectionTemplate.create('viewTemplate', this.templateProcessorRegistry);
    var data = this.data;

    data.onBackCallback = null;
    assertException(function () { template.clone(data); }, 'TypeError');

    data.onBackCallback = 123;
    assertException(function () { template.clone(data); }, 'TypeError');
  },

  testBackCallsCallback: function () {
    var template = TopicSelectionTemplate.create('viewTemplate', this.templateProcessorRegistry);
    var clone = template.clone(this.data);
    var backButton = clone.find('.backButton');
    backButton.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    backButton.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(this.data.backCalled);
  }
});
