var OpponentSelection = net.riemschneider.history.views.OpponentSelection;
var Opponent = net.riemschneider.history.model.Opponent;
var Difficulty = net.riemschneider.history.model.Difficulty;
var Template = net.riemschneider.ui.Template;
var ImageSelectionTemplate = net.riemschneider.history.views.components.ImageSelectionTemplate;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;
var SetSrcAttributeProcessor = net.riemschneider.ui.SetSrcAttributeProcessor;
var SetTextProcessor = net.riemschneider.ui.SetTextProcessor;
var AddClassProcessor = net.riemschneider.ui.AddClassProcessor;

TestCase('OpponentSelectionTest', {
  setUp: function () {
    $('body').empty();

    this.opponentTemplateDiv = $('<div data-template-id="opponent" class="imageSelectionOption"></div>');
    this.opponentTemplateDiv.append('<div data-class="background"></div>');
    this.opponentTemplateDiv.append('<img data-attr-src="image0" class="imageSelectionOptionImage" src="" />');
    this.opponentTemplateDiv.append('<div data-text="name0"></div>');
    this.opponentTemplateDiv.append('<img data-attr-src="image1" class="imageSelectionOptionImage" src="" />');
    this.opponentTemplateDiv.append('<div data-text="name1"></div>');

    this.opponentSelectionDiv = $('<div id="opponentSelection"></div>');
    this.opponentsDiv = $('<div id="opponents"></div>');
    this.questionMarksTop = $('<div id="questionQuestionMarksTop"></div>');
    this.questionMarksBottom = '<div id="questionQuestionMarksBottom"></div>';
    this.buttonBarDiv = $('<div class="footer"></div>');
    this.okButton = $('<div class="okButton"></div>');
    this.backButton = $('<div class="backButton"></div>');

    $('body').append(this.opponentTemplateDiv);
    $('body').append('<img data-template-id="backgroundImage">');
    $('body').append('<div data-template-id="background"></div>');
    $('body').append('<div data-template-id="imageSelection" class="container"></div>');

    $('body').append(this.opponentSelectionDiv);
    this.opponentSelectionDiv.append(this.opponentsDiv);
    this.opponentSelectionDiv.append(this.questionMarksTop);
    this.opponentSelectionDiv.append(this.questionMarksBottom);
    this.opponentSelectionDiv.append(this.buttonBarDiv);
    this.buttonBarDiv.append(this.okButton);
    this.buttonBarDiv.append(this.backButton);

    this.opponentSelectionDiv.hide();

    this.opponentInfos = [
      { background: 'green', image0: '0.png', name0: 'Hans', image1: '1.png', name1: 'Günther', callback: function () { this.called = true; }, called: false },
      { background: 'green', image0: '2.png', name0: 'Martin', image1: '3.png', name1: 'Siegfried', callback: function () { this.called = true; }, called: false },
      { background: 'yellow', image0: '4.png', name0: 'Sebastian', image1: '5.png', name1: 'Tom', callback: function () { this.called = true; }, called: false }
    ];

    this.templateProcessorRegistry = TemplateProcessorRegistry.create();
    this.templateProcessorRegistry.addProcessor(SetSrcAttributeProcessor.create());
    this.templateProcessorRegistry.addProcessor(SetTextProcessor.create());
    this.templateProcessorRegistry.addProcessor(AddClassProcessor.create());

    this.templates = {
      opponentTemplate: Template.create('opponent', this.templateProcessorRegistry),
      backgroundImageTemplate: Template.create('backgroundImage', this.templateProcessorRegistry),
      backgroundTemplate: Template.create('background', this.templateProcessorRegistry),
      imageSelectionTemplate: ImageSelectionTemplate.create('imageSelection', this.templateProcessorRegistry)
    };
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { OpponentSelection.create(null); }, 'TypeError');

    assertException(function () { OpponentSelection.create({}); }, 'TypeError');
  },

  testShowAndHide: function () {
    var sel = OpponentSelection.create(this.templates);
    sel.setOpponentInfos(this.opponentInfos);
    assertEquals('none', this.opponentSelectionDiv.css('display'));
    sel.show();
    assertEquals('block', this.opponentSelectionDiv.css('display'));
    sel.hide();
    assertEquals('none', this.opponentSelectionDiv.css('display'));
  },

  testAllOptionsShown: function () {
    var sel = OpponentSelection.create(this.templates);
    sel.setOpponentInfos(this.opponentInfos);
    sel.show();
    var allOptionDivs = this.opponentSelectionDiv.find('.imageSelectionOption');
    assertEquals(3, allOptionDivs.length);
  },

  testCanShowNewInfos: function () {
    var sel = OpponentSelection.create(this.templates);
    sel.setOpponentInfos(this.opponentInfos);
    sel.show();
    sel.hide();
    sel.setOpponentInfos([ this.opponentInfos[0], this.opponentInfos[1] ]);
    sel.show();
    var allOptionDivs = this.opponentSelectionDiv.find('.imageSelectionOption');
    assertEquals(2, allOptionDivs.length);
  },

  testOpponentSelectionCallsCallback: function () {
    var sel = OpponentSelection.create(this.templates);
    sel.setOpponentInfos(this.opponentInfos);
    sel.show();
    var allImages = this.opponentSelectionDiv.find('.imageSelectionOptionImage');
    $(allImages[1]).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    $(allImages[1]).trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(this.opponentInfos[0].called);
    assertFalse(this.opponentInfos[1].called);
    assertFalse(this.opponentInfos[2].called);
  },

  testBackCallsCallback: function () {
    var sel = OpponentSelection.create(this.templates);
    sel.setOpponentInfos(this.opponentInfos);
    var called = false;
    sel.onBack(function () { called = true; });
    sel.show();
    this.backButton.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    this.backButton.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  }
});
