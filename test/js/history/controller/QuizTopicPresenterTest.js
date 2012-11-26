var QuizTopicPresenter = net.riemschneider.history.controller.QuizTopicPresenter;
var Template = net.riemschneider.ui.Template;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;
var ImageData = net.riemschneider.graphics.ImageData;
var Topic = net.riemschneider.history.model.Topic;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('QuizTopicPresenterTest', {
  setUp: function () {
    $('body').append('<div data-template-id="template"></div>');

    var templateProcessorRegistry = TemplateProcessorRegistry.create();
    this.templates = {
      topicSelectionTemplate: Template.create('template', templateProcessorRegistry),
      imageSelectionTemplate: Template.create('template', templateProcessorRegistry),
      lockedTemplate: Template.create('template', templateProcessorRegistry),
      unlockedTemplate: Template.create('template', templateProcessorRegistry),
      backgroundImageTemplate: Template.create('template', templateProcessorRegistry),
      backgroundTemplate: Template.create('template', templateProcessorRegistry)
    };

    this.quizGenerator = {
      topicId: null,
      setCurrentTopic: function setCurrentTopic(topicId) { this.topicId = topicId; }
    };

    var mapImgData = ImageData.create('/test/images/test.png', Position.ZERO, Position.create(1, 1));
    this.topicsById = {
      topic1: Topic.create('topic1', 'Topic1', '/test/images/test.png', mapImgData, 1901),
      topic2: Topic.create('topic2', 'Topic2', '/test/images/test.png', mapImgData, 1900)
    };

    this.addOns = AddOns.create();
    this.addOns.unlock('topic2');
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreate: function () {
    var presenter = QuizTopicPresenter.create(this.quizGenerator, this.topicsById, this.addOns, this.templates);
    assertNotNull(presenter);
  },

  testCreateNullAndTypeSafe: function () {
    var quizGenerator = this.quizGenerator;
    var topicsById = this.topicsById;
    var addOns = this.addOns;
    var templates = this.templates;
    var template = templates.topicSelectionTemplate;

    assertException(function () { QuizTopicPresenter.create(quizGenerator, topicsById, addOns, null); }, 'TypeError');
    assertException(function () { QuizTopicPresenter.create(quizGenerator, topicsById, null, templates); }, 'TypeError');
    assertException(function () { QuizTopicPresenter.create(quizGenerator, null, addOns, templates); }, 'TypeError');
    assertException(function () { QuizTopicPresenter.create(null, topicsById, addOns, templates); }, 'TypeError');

    assertException(function () { QuizTopicPresenter.create(quizGenerator, topicsById, addOns, []); }, 'TypeError');
    assertException(function () { QuizTopicPresenter.create(quizGenerator, topicsById, {}, templates); }, 'TypeError');
    assertException(function () { QuizTopicPresenter.create(quizGenerator, { topic: {} }, addOns, templates); }, 'TypeError');

    templates.topicSelectionTemplate = {};
    assertException(function () { QuizTopicPresenter.create(quizGenerator, topicsById, addOns, templates); }, 'TypeError');
    templates.topicSelectionTemplate = template;

    templates.imageSelectionTemplate = {};
    assertException(function () { QuizTopicPresenter.create(quizGenerator, topicsById, addOns, templates); }, 'TypeError');
    templates.imageSelectionTemplate = template;

    templates.lockedTemplate = {};
    assertException(function () { QuizTopicPresenter.create(quizGenerator, topicsById, addOns, templates); }, 'TypeError');
    templates.lockedTemplate = template;

    templates.unlockedTemplate = {};
    assertException(function () { QuizTopicPresenter.create(quizGenerator, topicsById, addOns, templates); }, 'TypeError');
    templates.unlockedTemplate = template;

    templates.backgroundImageTemplate = {};
    assertException(function () { QuizTopicPresenter.create(quizGenerator, topicsById, addOns, templates); }, 'TypeError');
    templates.backgroundImageTemplate = template;

    templates.backgroundTemplate = {};
    assertException(function () { QuizTopicPresenter.create(quizGenerator, topicsById, addOns, templates); }, 'TypeError');
  },

  testShow: function () {
    var cloneData = null;
    this.templates.topicSelectionTemplate.onCloned = function onCloned(div, data) { cloneData = data; };

    var presenter = QuizTopicPresenter.create(this.quizGenerator, this.topicsById, this.addOns, this.templates);
    presenter.show(function onBack() {}, function onDone() {});

    assertNotUndefined(cloneData);
    assertSame(this.templates.imageSelectionTemplate, cloneData.imageSelection.template);
    assertUndefined(cloneData.imageSelection.selectedImageIdx);
    assertEquals(2, cloneData.imageSelection.options.length);

    assertSame(this.templates.unlockedTemplate, cloneData.imageSelection.options[0].template);
    assertSame(this.templates.lockedTemplate, cloneData.imageSelection.options[1].template);

    assertSame(this.templates.backgroundTemplate, cloneData.background.template);
    assertSame(this.templates.backgroundImageTemplate, cloneData.background.imageTemplate);
    assertEquals(3, cloneData.background.count);

    assertEquals(2, $('body').children().length);
  },

  testShowNullAndTypeSafe: function () {
    var presenter = QuizTopicPresenter.create(this.quizGenerator, this.topicsById, this.addOns, this.templates);
    var func = function () {};

    assertException(function () { presenter.show(func, null); }, 'TypeError');
    assertException(function () { presenter.show(null, func); }, 'TypeError');

    assertException(function () { presenter.show(func, 123); }, 'TypeError');
    assertException(function () { presenter.show(123, func); }, 'TypeError');
  },

  testHide: function () {
    var presenter = QuizTopicPresenter.create(this.quizGenerator, this.topicsById, this.addOns, this.templates);
    presenter.show(function onBack() {}, function onDone() {});
    presenter.hide();
    assertEquals(1, $('body').children().length);
  },

  testOnBack: function () {
    var cloneData = null;
    this.templates.topicSelectionTemplate.onCloned = function onCloned(div, data) { cloneData = data; };

    var presenter = QuizTopicPresenter.create(this.quizGenerator, this.topicsById, this.addOns, this.templates);
    var onBackCalled = false;
    presenter.show(function onBack() { onBackCalled = true; }, function onDone() {});

    assertFalse(onBackCalled);
    cloneData.onBackCallback();
    assertTrue(onBackCalled);
  },

  testOnDone: function () {
    var cloneData = null;
    this.templates.topicSelectionTemplate.onCloned = function onCloned(div, data) { cloneData = data; };

    var presenter = QuizTopicPresenter.create(this.quizGenerator, this.topicsById, this.addOns, this.templates);
    var onDoneCalled = false;
    presenter.show(function onBack() {}, function onDone() { onDoneCalled = true; });

    cloneData.getName = function getName() { return 'Frank'; };

    assertFalse(onDoneCalled);
    cloneData.imageSelection.options[1].callback();
    assertTrue(onDoneCalled);

    assertEquals('topic1', this.quizGenerator.topicId);
  }
});