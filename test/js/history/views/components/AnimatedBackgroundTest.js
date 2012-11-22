var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;

var Clock = net.riemschneider.utils.Clock;
var Template = net.riemschneider.ui.Template;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;

TestCase('AnimatedBackgroundTest', {
  setUp: function () {
    Clock.reset();
    $('body').empty();

    this.backgoundTemplateDiv = $('<img src="test.png" data-template-id="templateId" class="background"></div>');

    this.parent = $('<div></div>');

    $('body').append(this.backgoundTemplateDiv);
    $('body').append(this.parent);

    this.templateProcessorRegistry = TemplateProcessorRegistry.create();
    this.backgroundTemplate = Template.create('templateId', this.templateProcessorRegistry);
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreate: function () {
    AnimatedBackground.create(this.parent, 2, this.backgroundTemplate);
    var images = this.parent.find('.background');
    assertEquals(2, images.length);
    assertTrue(images[0].src.indexOf('test.png') >= 0);
    assertTrue(images[1].src.indexOf('test.png') >= 0);
  },

  testCreateNullAndTypeSafe: function () {
    var template = this.avatarTemplate;
    var parent = this.parent;

    assertException(function () { AnimatedBackground.create(parent, 2, null); }, 'TypeError');
    assertException(function () { AnimatedBackground.create(parent, null, template); }, 'TypeError');
    assertException(function () { AnimatedBackground.create(null, 2, template); }, 'TypeError');

    assertException(function () { AnimatedBackground.create(parent, 2, {}); }, 'TypeError');
    assertException(function () { AnimatedBackground.create(parent, 0, template); }, 'TypeError');
    assertException(function () { AnimatedBackground.create(parent, '2', template); }, 'TypeError');
  }
});
