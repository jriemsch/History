var JQueryTestUtils = net.riemschneider.testutils.JQueryTestUtils;
var Template = net.riemschneider.ui.Template;
var ImageSelectionTemplate = net.riemschneider.history.views.components.ImageSelectionTemplate;
var SelectionTemplate = net.riemschneider.history.views.SelectionTemplate;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;
var SetSrcAttributeProcessor = net.riemschneider.ui.SetSrcAttributeProcessor;
var TapEventProcessor = net.riemschneider.ui.TapEventProcessor;
var TextInputProcessor = net.riemschneider.ui.TextInputProcessor;
var ReplaceWithTemplateProcessor = net.riemschneider.ui.ReplaceWithTemplateProcessor;

TestCase('SelectionTemplateTest', {
  setUp: function () {
    $('body').empty();

    this.viewTemplateDiv = $('<div class="selection" data-template-id="viewTemplate"></div>');
    this.viewTemplateDiv.append('<div class="items" data-replace-with-template="imageSelection"></div>');
    this.viewTemplateDiv.append('<div class="questionMarksTop"></div>');
    this.viewTemplateDiv.append('<div class="questionMarksBottom"></div>');

    $('body').append('<div data-template-id="item"><img data-attr-src="image" class="imageClass"></div>');
    $('body').append('<img data-template-id="backgroundImage">');
    $('body').append('<div data-template-id="background"></div>');
    $('body').append('<div data-template-id="imageSelection" class="container"></div>');
    $('body').append(this.viewTemplateDiv);

    this.templateProcessorRegistry = TemplateProcessorRegistry.create();
    this.templateProcessorRegistry.addProcessor(ReplaceWithTemplateProcessor.create());
    this.templateProcessorRegistry.addProcessor(SetSrcAttributeProcessor.create());

    this.templates = {
      itemTemplate: Template.create('item', this.templateProcessorRegistry),
      backgroundImageTemplate: Template.create('backgroundImage', this.templateProcessorRegistry),
      backgroundTemplate: Template.create('background', this.templateProcessorRegistry),
      imageSelectionTemplate: ImageSelectionTemplate.create('imageSelection', this.templateProcessorRegistry)
    };

    this.data = {
      imageSelection: {
        template: this.templates.imageSelectionTemplate,
        selectedImageIdx: 1,
        options: [ { template: this.templates.itemTemplate, image: '1.png' }, { template: this.templates.itemTemplate, image: '2.png' } ]
      },
      background: {
        template: this.templates.backgroundTemplate,
        imageTemplate: this.templates.backgroundImageTemplate,
        count: 3
      }
    };
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreateNullAndTypeSafe: function () {
    var registry = this.templateProcessorRegistry;

    assertException(function () { SelectionTemplate.create('templateId', null); }, 'TypeError');
    assertException(function () { SelectionTemplate.create(null, registry); }, 'TypeError');

    assertException(function () { SelectionTemplate.create(12, registry); }, 'TypeError');
  },

  testClone: function () {
    var template = SelectionTemplate.create('viewTemplate', this.templateProcessorRegistry);
    var clone = template.clone(this.data);
    assertTrue(clone.hasClass('selection'));
    assertEquals(2, clone.find('.imageClass').length);

    var selectedImage = clone.find('.imageSelectionSelector .imageClass');
    assertEquals(1, selectedImage.length);
    assertEquals('2.png', selectedImage.attr('src'));
  }
});
