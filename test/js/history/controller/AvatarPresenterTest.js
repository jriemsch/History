var AvatarPresenter = net.riemschneider.history.controller.AvatarPresenter;
var PlayerController = net.riemschneider.history.controller.PlayerController;
var Template = net.riemschneider.ui.Template;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;
var AvatarImages = net.riemschneider.history.data.AvatarImages;

TestCase('AvatarPresenterTest', {
  setUp: function () {
    this.playerController = PlayerController.create();
    this.playerController.getPlayer().setAvatarImageIdx(2);
    this.playerController.getPlayer().setName('Anton');

    $('body').append('<div data-template-id="template"></div>');

    var templateProcessorRegistry = TemplateProcessorRegistry.create();
    this.templates = {
      avatarSelectionTemplate: Template.create('template', templateProcessorRegistry),
      imageSelectionTemplate: Template.create('template', templateProcessorRegistry),
      avatarImageSelectionTemplate: Template.create('template', templateProcessorRegistry),
      backgroundImageTemplate: Template.create('template', templateProcessorRegistry),
      backgroundTemplate: Template.create('template', templateProcessorRegistry)
    };
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreate: function () {
    var presenter = AvatarPresenter.create(this.playerController, this.templates);
    assertNotNull(presenter);
  },

  testCreateNullAndTypeSafe: function () {
    var playerController = this.playerController;
    var templates = this.templates;
    var template = templates.avatarSelectionTemplate;

    assertException(function () { AvatarPresenter.create(playerController, null); }, 'TypeError');
    assertException(function () { AvatarPresenter.create(null, templates); }, 'TypeError');

    assertException(function () { AvatarPresenter.create(playerController, []); }, 'TypeError');
    assertException(function () { AvatarPresenter.create({}, templates); }, 'TypeError');

    templates.avatarImageSelectionTemplate = {};
    assertException(function () { AvatarPresenter.create(playerController, templates); }, 'TypeError');
    templates.avatarImageSelectionTemplate = template;

    templates.imageSelectionTemplate = {};
    assertException(function () { AvatarPresenter.create(playerController, templates); }, 'TypeError');
    templates.imageSelectionTemplate = template;

    templates.avatarImageSelectionTemplate = {};
    assertException(function () { AvatarPresenter.create(playerController, templates); }, 'TypeError');
    templates.avatarImageSelectionTemplate = template;

    templates.backgroundImageTemplate = {};
    assertException(function () { AvatarPresenter.create(playerController, templates); }, 'TypeError');
    templates.backgroundImageTemplate = template;

    templates.backgroundTemplate = {};
    assertException(function () { AvatarPresenter.create(playerController, templates); }, 'TypeError');
  },

  testShow: function () {
    var cloneData = null;
    this.templates.avatarSelectionTemplate.onCloned = function onCloned(div, data) { cloneData = data; };

    var presenter = AvatarPresenter.create(this.playerController, this.templates);
    presenter.show(function onDone() {});

    assertNotUndefined(cloneData);
    assertSame(this.templates.imageSelectionTemplate, cloneData.imageSelection.template);
    assertEquals(2, cloneData.imageSelection.selectedImageIdx);
    assertEquals(AvatarImages.getImageCount(), cloneData.imageSelection.options.length);

    for (var idx = 0; idx < AvatarImages.getImageCount(); ++idx) {
      assertSame(this.templates.avatarImageSelectionTemplate, cloneData.imageSelection.options[idx].template);
      assertSame(AvatarImages.getImage(idx), cloneData.imageSelection.options[idx].image);
    }

    assertSame(this.templates.backgroundTemplate, cloneData.background.template);
    assertSame(this.templates.backgroundImageTemplate, cloneData.background.imageTemplate);
    assertEquals(3, cloneData.background.count);

    assertEquals('Anton', cloneData.selectedName);

    assertEquals(2, $('body').children().length);
  },

  testHide: function () {
    var presenter = AvatarPresenter.create(this.playerController, this.templates);
    presenter.show(function onDone() {});
    presenter.hide();
    assertEquals(1, $('body').children().length);
  },

  testOnOk: function () {
    var cloneData = null;
    this.templates.avatarSelectionTemplate.onCloned = function onCloned(div, data) { cloneData = data; };

    var presenter = AvatarPresenter.create(this.playerController, this.templates);
    var onDoneCalled = false;
    presenter.show(function onDone() { onDoneCalled = true; });

    cloneData.getName = function getName() { return 'Frank'; };
    cloneData.imageSelection.getSelection = function getSelection() { return 12; };

    assertFalse(onDoneCalled);
    cloneData.onOkCallback();
    assertTrue(onDoneCalled);

    assertEquals('Frank', this.playerController.getPlayer().getName());
    assertEquals(12, this.playerController.getPlayer().getAvatarImageIdx());
  }
});