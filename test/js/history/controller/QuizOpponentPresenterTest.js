var QuizOpponentPresenter = net.riemschneider.history.controller.QuizOpponentPresenter;
var Template = net.riemschneider.ui.Template;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;
var ImageData = net.riemschneider.graphics.ImageData;
var Opponent = net.riemschneider.history.model.Opponent;
var Difficulty = net.riemschneider.history.model.Difficulty;

TestCase('QuizOpponentPresenterTest', {
  setUp: function () {
    $('body').append('<div data-template-id="template"></div>');

    var templateProcessorRegistry = TemplateProcessorRegistry.create();
    this.templates = {
      opponentSelectionTemplate: Template.create('template', templateProcessorRegistry),
      imageSelectionTemplate: Template.create('template', templateProcessorRegistry),
      opponentTemplate: Template.create('template', templateProcessorRegistry),
      backgroundImageTemplate: Template.create('template', templateProcessorRegistry),
      backgroundTemplate: Template.create('template', templateProcessorRegistry)
    };

    var pairings = {};
    pairings[Difficulty.EASY.key] = [
      {
        first: Opponent.create('OPP0', 'Hans', 0, Difficulty.EASY, [ 0.9, 0.8, 0.5 ], []),
        second: Opponent.create('OPP1', 'Günther', 1, Difficulty.EASY, [ 0.95, 0.85, 0.7 ], [])
      },
      {
        first: Opponent.create('OPP2', 'Martin', 2, Difficulty.EASY, [ 0.8, 0.5, 0.2 ], []),
        second: Opponent.create('OPP3', 'Siegfried', 3, Difficulty.EASY, [ 0.8, 0.7, 0.5 ], [])
      }
    ];
    pairings[Difficulty.MEDIUM.key] = [
      {
        first: Opponent.create('OPP4', 'Sebastian', 4, Difficulty.MEDIUM, [ 0.95, 0.9, 0.8 ], []),
        second: Opponent.create('OPP5', 'Tom', 5, Difficulty.EASY, [ 0.8, 0.7, 0.3 ], [])
      }
    ];

    this.pairings = pairings;
    this.opponentController = {
      getRandomOpponentPairings: function getRandomOpponentPairings() {
        return pairings;
      }
    };

    var quiz = {};
    this.quiz = quiz;
    this.quizGenerator = {
      opponentPairing: null,
      difficulty: null,
      created: false,
      setCurrentOpponents: function setCurrentOpponents(pairing) { this.opponentPairing = pairing; },
      setCurrentDifficulty: function setCurrentDifficulty(difficulty) { this.difficulty = difficulty; },
      generate: function generate() { this.created = true; return quiz; }
    };

    this.quizController = {
      createdQuiz: null,
      setCurrentQuiz: function setCurrentQuiz(quiz) { this.createdQuiz = quiz; }
    };
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreate: function () {
    var presenter = QuizOpponentPresenter.create(this.opponentController, this.quizGenerator, this.quizController, this.templates);
    assertNotNull(presenter);
  },

  testCreateNullAndTypeSafe: function () {
    var opponentController = this.opponentController;
    var quizGenerator = this.quizGenerator;
    var quizController = this.quizController;
    var templates = this.templates;
    var template = templates.opponentSelectionTemplate;

    assertException(function () { QuizOpponentPresenter.create(opponentController, quizGenerator, quizController, null); }, 'TypeError');
    assertException(function () { QuizOpponentPresenter.create(opponentController, quizGenerator, null, templates); }, 'TypeError');
    assertException(function () { QuizOpponentPresenter.create(opponentController, null, quizController, templates); }, 'TypeError');
    assertException(function () { QuizOpponentPresenter.create(null, quizGenerator, quizController, templates); }, 'TypeError');

    assertException(function () { QuizOpponentPresenter.create(opponentController, quizGenerator, quizController, []); }, 'TypeError');

    templates.opponentSelectionTemplate = {};
    assertException(function () { QuizOpponentPresenter.create(opponentController, quizGenerator, quizController, templates); }, 'TypeError');
    templates.opponentSelectionTemplate = template;

    templates.imageSelectionTemplate = {};
    assertException(function () { QuizOpponentPresenter.create(opponentController, quizGenerator, quizController, templates); }, 'TypeError');
    templates.imageSelectionTemplate = template;

    templates.opponentTemplate = {};
    assertException(function () { QuizOpponentPresenter.create(opponentController, quizGenerator, quizController, templates); }, 'TypeError');
    templates.opponentTemplate = template;

    templates.backgroundImageTemplate = {};
    assertException(function () { QuizOpponentPresenter.create(opponentController, quizGenerator, quizController, templates); }, 'TypeError');
    templates.backgroundImageTemplate = template;

    templates.backgroundTemplate = {};
    assertException(function () { QuizOpponentPresenter.create(opponentController, quizGenerator, quizController, templates); }, 'TypeError');
  },

  testShow: function () {
    var cloneData = null;
    this.templates.opponentSelectionTemplate.onCloned = function onCloned(div, data) { cloneData = data; };

    var presenter = QuizOpponentPresenter.create(this.opponentController, this.quizGenerator, this.quizController, this.templates);
    presenter.show(function onBack() {}, function onDone() {});

    assertNotUndefined(cloneData);
    assertSame(this.templates.imageSelectionTemplate, cloneData.imageSelection.template);
    assertUndefined(cloneData.imageSelection.selectedImageIdx);
    assertEquals(3, cloneData.imageSelection.options.length);

    assertSame(this.templates.backgroundTemplate, cloneData.background.template);
    assertSame(this.templates.backgroundImageTemplate, cloneData.background.imageTemplate);
    assertEquals(3, cloneData.background.count);

    assertSame(this.templates.opponentTemplate, cloneData.imageSelection.options[0].template);
    assertEquals('imageSelectionBackgroundGlowGreen', cloneData.imageSelection.options[0].background);
    assertEquals('images/avatars/avatar000.png', cloneData.imageSelection.options[0].image0);
    assertEquals('Hans', cloneData.imageSelection.options[0].name0);
    assertEquals('images/avatars/avatar001.png', cloneData.imageSelection.options[0].image1);
    assertEquals('Günther', cloneData.imageSelection.options[0].name1);

    assertSame(this.templates.opponentTemplate, cloneData.imageSelection.options[1].template);
    assertEquals('imageSelectionBackgroundGlowGreen', cloneData.imageSelection.options[1].background);
    assertEquals('images/avatars/avatar002.png', cloneData.imageSelection.options[1].image0);
    assertEquals('Martin', cloneData.imageSelection.options[1].name0);
    assertEquals('images/avatars/avatar003.png', cloneData.imageSelection.options[1].image1);
    assertEquals('Siegfried', cloneData.imageSelection.options[1].name1);

    assertSame(this.templates.opponentTemplate, cloneData.imageSelection.options[2].template);
    assertEquals('imageSelectionBackgroundGlowYellow', cloneData.imageSelection.options[2].background);
    assertEquals('images/avatars/avatar004.png', cloneData.imageSelection.options[2].image0);
    assertEquals('Sebastian', cloneData.imageSelection.options[2].name0);
    assertEquals('images/avatars/avatar005.png', cloneData.imageSelection.options[2].image1);
    assertEquals('Tom', cloneData.imageSelection.options[2].name1);

    assertEquals(2, $('body').children().length);
  },

  testShowNullAndTypeSafe: function () {
    var presenter = QuizOpponentPresenter.create(this.opponentController, this.quizGenerator, this.quizController, this.templates);
    var func = function () {};

    assertException(function () { presenter.show(func, null); }, 'TypeError');
    assertException(function () { presenter.show(null, func); }, 'TypeError');

    assertException(function () { presenter.show(func, 123); }, 'TypeError');
    assertException(function () { presenter.show(123, func); }, 'TypeError');
  },

  testHide: function () {
    var presenter = QuizOpponentPresenter.create(this.opponentController, this.quizGenerator, this.quizController, this.templates);
    presenter.show(function onBack() {}, function onDone() {});
    presenter.hide();
    assertEquals(1, $('body').children().length);
  },

  testOnBack: function () {
    var cloneData = null;
    this.templates.opponentSelectionTemplate.onCloned = function onCloned(div, data) { cloneData = data; };

    var presenter = QuizOpponentPresenter.create(this.opponentController, this.quizGenerator, this.quizController, this.templates);
    var onBackCalled = false;
    presenter.show(function onBack() { onBackCalled = true; }, function onDone() {});

    assertFalse(onBackCalled);
    cloneData.onBackCallback();
    assertTrue(onBackCalled);
  },

  testOnDone: function () {
    var cloneData = null;
    this.templates.opponentSelectionTemplate.onCloned = function onCloned(div, data) { cloneData = data; };

    var presenter = QuizOpponentPresenter.create(this.opponentController, this.quizGenerator, this.quizController, this.templates);
    var onDoneCalled = false;
    presenter.show(function onBack() {}, function onDone() { onDoneCalled = true; });

    cloneData.getName = function getName() { return 'Frank'; };

    assertFalse(onDoneCalled);
    cloneData.imageSelection.options[1].callback();
    assertTrue(onDoneCalled);

    assertSame(this.pairings[Difficulty.EASY.key][1], this.quizGenerator.opponentPairing);
    assertSame(Difficulty.EASY, this.quizGenerator.difficulty);
    assertTrue(this.quizGenerator.created);
    assertSame(this.quiz, this.quizController.createdQuiz);
  }
});