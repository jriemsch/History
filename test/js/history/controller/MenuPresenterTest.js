var MenuPresenter = net.riemschneider.history.controller.MenuPresenter;
var Template = net.riemschneider.ui.Template;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;

TestCase('MenuPresenterTest', {
  setUp: function () {
    $('body').append('<div data-template-id="template"></div>');

    var templateProcessorRegistry = TemplateProcessorRegistry.create();
    this.templates = {
      menuTemplate: Template.create('template', templateProcessorRegistry),
      menuOptionTemplate: Template.create('template', templateProcessorRegistry),
      backgroundImageTemplate: Template.create('template', templateProcessorRegistry),
      backgroundTemplate: Template.create('template', templateProcessorRegistry)
    };
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreate: function () {
    var presenter = MenuPresenter.create(this.templates);
    assertNotNull(presenter);
  },

  testCreateNullAndTypeSafe: function () {
    var templates = this.templates;
    var template = templates.menuTemplate;

    assertException(function () { MenuPresenter.create(null); }, 'TypeError');

    assertException(function () { MenuPresenter.create([]); }, 'TypeError');

    templates.menuTemplate = {};
    assertException(function () { MenuPresenter.create(templates); }, 'TypeError');
    templates.menuTemplate = template;

    templates.menuOptionTemplate = {};
    assertException(function () { MenuPresenter.create(templates); }, 'TypeError');
    templates.menuOptionTemplate = template;

    templates.backgroundImageTemplate = {};
    assertException(function () { MenuPresenter.create(templates); }, 'TypeError');
    templates.backgroundImageTemplate = template;

    templates.backgroundTemplate = {};
    assertException(function () { MenuPresenter.create(templates); }, 'TypeError');
  },

  testShow: function () {
    var cloneData = null;
    this.templates.menuTemplate.onCloned = function onCloned(div, data) { cloneData = data; };

    var presenter = MenuPresenter.create(this.templates);
    presenter.show(function onAvatar() {}, function onQuiz() {}, function onLearn() {}, function onStats() {});

    assertNotUndefined(cloneData);
    assertEquals(4, cloneData.options.length);

    for (var idx = 0; idx < 4; ++idx) {
      assertSame(this.templates.menuOptionTemplate, cloneData.options[idx].template);
      assertNotNull(cloneData.options[idx].image);
      assertNotNull(cloneData.options[idx].text);
      assertNotNull(cloneData.options[idx].style);
      assertNotNull(cloneData.options[idx].onSelect);
    }

    assertSame(this.templates.backgroundTemplate, cloneData.background.template);
    assertSame(this.templates.backgroundImageTemplate, cloneData.background.imageTemplate);
    assertEquals(6, cloneData.background.count);

    assertEquals(2, $('body').children().length);
  },

  testShowNullAndTypeSafe: function () {
    var presenter = MenuPresenter.create(this.templates);
    function callback() {}

    assertException(function () { presenter.show(callback, callback, callback, null); }, 'TypeError');
    assertException(function () { presenter.show(callback, callback, null, callback); }, 'TypeError');
    assertException(function () { presenter.show(callback, null, callback, callback); }, 'TypeError');
    assertException(function () { presenter.show(null, callback, callback, callback); }, 'TypeError');

    assertException(function () { presenter.show(callback, callback, callback, 123); }, 'TypeError');
    assertException(function () { presenter.show(callback, callback, 123, callback); }, 'TypeError');
    assertException(function () { presenter.show(callback, 123, callback, callback); }, 'TypeError');
    assertException(function () { presenter.show(123, callback, callback, callback); }, 'TypeError');
  },

  testHide: function () {
    var presenter = MenuPresenter.create(this.templates);
    presenter.show(function onAvatar() {}, function onQuiz() {}, function onLearn() {}, function onStats() {});
    presenter.hide();
    assertEquals(1, $('body').children().length);
  },

  testOnSelectOption: function () {
    var cloneData = null;
    this.templates.menuTemplate.onCloned = function onCloned(div, data) { cloneData = data; };

    var presenter = MenuPresenter.create(this.templates);
    var called = null;
    presenter.show(function onAvatar() { called = 'avatar'; }, function onQuiz() { called = 'quiz'; }, function onLearn() { called = 'learn'; }, function onStats() { called = 'stats'; });

    assertNull(called);
    cloneData.options[0].onSelect();
    assertEquals('avatar', called);

    cloneData.options[1].onSelect();
    assertEquals('quiz', called);

    cloneData.options[2].onSelect();
    assertEquals('learn', called);

    cloneData.options[3].onSelect();
    assertEquals('stats', called);
  }
});