var Menu = net.riemschneider.history.views.Menu;
var Template = net.riemschneider.ui.Template;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;

TestCase('MenuTest', {
  setUp: function () {
    $('body').empty();

    this.backgroundImageTemplateDiv = $();

    this.menuBackground = $('<div id="menuBackground"></div>');
    this.menuOptions = $('<div id="menuOptions"></div>');
    this.menu = $('<div id="menu"></div>');

    $('body').append('<img data-template-id="backgroundImage">');
    $('body').append('<div data-template-id="background">');
    $('body').append(this.menu);
    this.menu.append(this.menuBackground);
    this.menu.append(this.menuOptions);
    this.menu.hide();

    this.templateProcessorRegistry = TemplateProcessorRegistry.create();

    this.templates = {
      backgroundImageTemplate: Template.create('backgroundImage', this.templateProcessorRegistry),
      backgroundTemplate: Template.create('background', this.templateProcessorRegistry)
    };
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { Menu.create(null); }, 'TypeError');

    assertException(function () { Menu.create({}); }, 'TypeError');
  },

  tearDown: function () {
    $('body').empty();
  },

  testShowAndHide: function () {
    var menu = Menu.create(this.templates);
    assertEquals('none', this.menu.css('display'));
    menu.show();
    assertEquals('block', this.menu.css('display'));
    var options = this.menuOptions.find('.menuOption');
    assertEquals(4, options.length);
    menu.hide();
    assertEquals('none', this.menu.css('display'));
  },

  testClickOption: function () {
    var menu = Menu.create(this.templates);
    var called = false;
    menu.onSelect(Menu.Option.AVATAR, function () { called = true; });
    menu.show();
    var options = this.menuOptions.find('.menuOptionImage');
    $(options[0]).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    $(options[0]).trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  }
});