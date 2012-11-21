var OpponentSelection = net.riemschneider.history.views.OpponentSelection;
var Opponent = net.riemschneider.history.model.Opponent;
var Difficulty = net.riemschneider.history.model.Difficulty;

TestCase('OpponentSelectionTest', {
  setUp: function () {
    $('body').empty();

    this.templateDiv = $('<div data-template-id="opponentImageSelectionDiv" class="imageSelectionOption"></div>');
    this.templateDiv.append('<div data-id="background" data-attr="class"></div>');
    var opp0Div = $('<div></div>');
    opp0Div.append('<img data-id="image0" data-attr="src" class="imageSelectionOptionImage" src="" />');
    opp0Div.append('<div data-id="name0" data-attr="text"></div>');
    var opp1Div = $('<div></div>');
    opp1Div.append('<img data-id="image1" data-attr="src" class="imageSelectionOptionImage" src="" />');
    opp1Div.append('<div data-id="name1" data-attr="text"></div>');
    this.templateDiv.append(opp0Div);
    this.templateDiv.append(opp1Div);

    this.opponentSelectionDiv = $('<div id="opponentSelection"></div>');
    this.opponentsDiv = $('<div id="opponents"></div>');
    this.questionMarksTop = $('<div id="questionQuestionMarksTop"></div>');
    this.questionMarksBottom = '<div id="questionQuestionMarksBottom"></div>';
    this.buttonBarDiv = $('<div class="footer"></div>');
    this.okButton = $('<div class="okButton"></div>');
    this.backButton = $('<div class="backButton"></div>');

    $('body').append(this.templateDiv);
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
  },

  tearDown: function () {
    $('body').empty();
  },

  testShowAndHide: function () {
    var sel = OpponentSelection.create();
    sel.setOpponentInfos(this.opponentInfos);
    assertEquals('none', this.opponentSelectionDiv.css('display'));
    sel.show();
    assertEquals('block', this.opponentSelectionDiv.css('display'));
    sel.hide();
    assertEquals('none', this.opponentSelectionDiv.css('display'));
  },

  testAllOptionsShown: function () {
    var sel = OpponentSelection.create();
    sel.setOpponentInfos(this.opponentInfos);
    sel.show();
    var allOptionDivs = this.opponentSelectionDiv.find('.imageSelectionOption');
    assertEquals(3, allOptionDivs.length);
  },

  testCanShowNewInfos: function () {
    var sel = OpponentSelection.create();
    sel.setOpponentInfos(this.opponentInfos);
    sel.show();
    sel.hide();
    sel.setOpponentInfos([ this.opponentInfos[0], this.opponentInfos[1] ]);
    sel.show();
    var allOptionDivs = this.opponentSelectionDiv.find('.imageSelectionOption');
    assertEquals(2, allOptionDivs.length);
  },

  testOpponentSelectionCallsCallback: function () {
    var sel = OpponentSelection.create();
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
    var sel = OpponentSelection.create();
    sel.setOpponentInfos(this.opponentInfos);
    var called = false;
    sel.onBack(function () { called = true; });
    sel.show();
    this.backButton.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    this.backButton.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  }
});
