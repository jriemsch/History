var MenuTemplate = net.riemschneider.history.views.MenuTemplate;
var Template = net.riemschneider.ui.Template;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;

TestCase('MenuTemplateTest', {
  setUp: function () {
    $('body').empty();

    this.viewTemplateDiv = $('<div class="view" data-template-id="viewTemplate"></div>');
    this.viewTemplateDiv.append('<div class="menuOptions"></div>');

    $('body').append(this.viewTemplateDiv);
    $('body').append('<div data-template-id="menuOptionTemplate" class="menuOption">');

    this.templateProcessorRegistry = TemplateProcessorRegistry.create();

    this.templates = {
      menuOptionTemplate: Template.create('menuOptionTemplate', this.templateProcessorRegistry)
    };

    this.data = {
      options: [ { template: this.templates.menuOptionTemplate }, { template: this.templates.menuOptionTemplate } ]
    };
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreateNullAndTypeSafe: function () {
    var registry = this.templateProcessorRegistry;

    assertException(function () { MenuTemplate.create('templateId', null); }, 'TypeError');
    assertException(function () { MenuTemplate.create(null, registry); }, 'TypeError');

    assertException(function () { MenuTemplate.create(12, registry); }, 'TypeError');
  },

  testClone: function () {
    var template = MenuTemplate.create('viewTemplate', this.templateProcessorRegistry);
    var clone = template.clone(this.data);
    assertTrue(clone.hasClass('view'));
    assertEquals(2, clone.find('.menuOption').length);
  }
});