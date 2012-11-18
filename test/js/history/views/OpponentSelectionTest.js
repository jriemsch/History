var OpponentSelection = net.riemschneider.history.views.OpponentSelection;
var Opponent = net.riemschneider.history.model.Opponent;
var Difficulty = net.riemschneider.history.model.Difficulty;

TestCase('OpponentSelectionTest', {
  setUp: function () {
    $('body').empty();

    this.opponentSelectionDiv = $('<div id="opponentSelection"></div>');
    this.opponentsDiv = $('<div id="opponents"></div>');
    this.questionMarksTop = $('<div id="questionQuestionMarksTop"></div>');
    this.questionMarksBottom = '<div id="questionQuestionMarksBottom"></div>';
    this.buttonBarDiv = $('<div class="footer"></div>');
    this.okButton = $('<div class="okButton"></div>');
    this.backButton = $('<div class="backButton"></div>');

    $('body').append(this.opponentSelectionDiv);
    this.opponentSelectionDiv.append(this.opponentsDiv);
    this.opponentSelectionDiv.append(this.questionMarksTop);
    this.opponentSelectionDiv.append(this.questionMarksBottom);
    this.opponentSelectionDiv.append(this.buttonBarDiv);
    this.buttonBarDiv.append(this.okButton);
    this.buttonBarDiv.append(this.backButton);

    this.opponentSelectionDiv.hide();

    this.opponentInfos = [
      { backgroundClass: 'green', imageInfos: [ { avatarImageIdx: 0, name: 'Hans' }, { avatarImageIdx: 1, name: 'Günther' } ], callback: function () { this.called = true; }, called: false },
      { backgroundClass: 'green', imageInfos: [ { avatarImageIdx: 2, name: 'Martin' }, { avatarImageIdx: 3, name: 'Siegfried' } ], callback: function () { this.called = true; }, called: false },
      { backgroundClass: 'yellow', imageInfos: [ { avatarImageIdx: 4, name: 'Sebastian' }, { avatarImageIdx: 5, name: 'Tom' } ], callback: function () { this.called = true; }, called: false }
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
    var allOptionDivs = $('.imageSelectionOption');
    assertEquals(3, allOptionDivs.length);
  },

  testCanShowNewInfos: function () {
    var sel = OpponentSelection.create();
    sel.setOpponentInfos(this.opponentInfos);
    sel.show();
    sel.hide();
    sel.setOpponentInfos([ this.opponentInfos[0], this.opponentInfos[1] ]);
    sel.show();
    var allOptionDivs = $('.imageSelectionOption');
    assertEquals(2, allOptionDivs.length);
  },

  testOpponentSelectionCallsCallback: function () {
    var sel = OpponentSelection.create();
    sel.setOpponentInfos(this.opponentInfos);
    sel.show();
    var allImages = $('.imageSelectionOptionImage');
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
