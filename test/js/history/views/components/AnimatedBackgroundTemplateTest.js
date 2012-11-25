var AnimatedBackgroundTemplate = net.riemschneider.history.views.components.AnimatedBackgroundTemplate;

var Clock = net.riemschneider.utils.Clock;
var Template = net.riemschneider.ui.Template;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;

TestCase('AnimatedBackgroundTemplateTest', {
  setUp: function () {
    Clock.reset();
    $('body').empty();

    $('body').append('<img src="test.png" data-template-id="imageTemplate" class="backgroundImage">');
    $('body').append('<div data-template-id="template"></div>');
    $('body').append(this.parent);

    this.templateProcessorRegistry = TemplateProcessorRegistry.create();
    this.backgroundImageTemplate = Template.create('imageTemplate', this.templateProcessorRegistry);
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreate: function () {
    var template = AnimatedBackgroundTemplate.create('template', this.templateProcessorRegistry);
    var background = template.clone({ count: 2, imageTemplate: this.backgroundImageTemplate });
    var images = background.find('.backgroundImage');
    assertEquals(2, images.length);
    assertTrue(images[0].src.indexOf('test.png') >= 0);
    assertTrue(images[1].src.indexOf('test.png') >= 0);
  },

  testCreateNullAndTypeSafe: function () {
    var templateProcessorRegistry = this.templateProcessorRegistry;

    assertException(function () { AnimatedBackgroundTemplate.create('template', null); }, 'TypeError');
    assertException(function () { AnimatedBackgroundTemplate.create(null, templateProcessorRegistry); }, 'TypeError');

    assertException(function () { AnimatedBackgroundTemplate.create(23, templateProcessorRegistry); }, 'TypeError');
  },

  testCloneNullAndTypeSafe: function () {
    var template = AnimatedBackgroundTemplate.create('template', this.templateProcessorRegistry);
    var backgroundImageTemplate = this.backgroundImageTemplate;

    assertException(function () { template.clone({ count: 2, imageTemplate: null }); }, 'TypeError');
    assertException(function () { template.clone({ count: null, imageTemplate: backgroundImageTemplate }); }, 'TypeError');

    assertException(function () { template.clone({ count: 2, imageTemplate: {} }); }, 'TypeError');
    assertException(function () { template.clone({ count: '2', imageTemplate: backgroundImageTemplate }); }, 'TypeError');
    assertException(function () { template.clone({ count: 0, imageTemplate: backgroundImageTemplate }); }, 'TypeError');
  }
});
