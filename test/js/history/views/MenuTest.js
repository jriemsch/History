var Menu = net.riemschneider.history.views.Menu;

TestCase('MenuTest', {
  setUp: function () {
    $('body').empty();
    this.menu = $('<div id="menu"></div>');
    this.menuBackground = $('<div id="menuBackground"></div>');
    this.menuOptions = $('<div id="menuOptions"></div>');
    $('body').append(this.menu);
    this.menu.append(this.menuBackground);
    this.menu.append(this.menuOptions);
    this.menu.hide();
  },

  tearDown: function () {
    $('body').empty();
  },

  testShowAndHide: function () {
    var menu = Menu.create();
    assertEquals('none', this.menu.css('display'));
    menu.show();
    assertEquals('block', this.menu.css('display'));
    var options = this.menuOptions.find('.menuOption');
    assertEquals(4, options.length);
    menu.hide();
    assertEquals('none', this.menu.css('display'));
  },

  testClickOption: function () {
    var menu = Menu.create();
    var called = false;
    menu.onSelect(Menu.Option.AVATAR, function () { called = true; });
    menu.show();
    var options = this.menuOptions.find('.menuOptionImage');
    $(options[0]).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    $(options[0]).trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  }
});