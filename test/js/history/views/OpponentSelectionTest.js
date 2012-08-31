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

    var opponentPairings = {};
    opponentPairings[Difficulty.EASY.key] = [
      {
        first: Opponent.create('OPP0', 'Hans Schenk', 0, Difficulty.EASY, [ 0.9, 0.8, 0.5 ], []),
        second: Opponent.create('OPP1', 'Günther Wernbach', 1, Difficulty.EASY, [ 0.95, 0.85, 0.7 ], [])
      },
      {
        first: Opponent.create('OPP2', 'Martin Salm', 2, Difficulty.EASY, [ 0.8, 0.5, 0.2 ], []),
        second: Opponent.create('OPP3', 'Dr. Siegfried Hubertus', 3, Difficulty.MEDIUM, [ 0.8, 0.7, 0.5 ], [])
      }
    ];

    this.opponentController = {
      getRandomOpponentPairings: function getRandomOpponentPairings(cnt) { return opponentPairings; }
    };
  },

  tearDown: function () {
    $('body').empty();
  },

  testShowAndHide: function () {
    var sel = OpponentSelection.create(this.opponentController);
    assertEquals('none', this.opponentSelectionDiv.css('display'));
    sel.show();
    assertEquals('block', this.opponentSelectionDiv.css('display'));
    sel.hide();
    assertEquals('none', this.opponentSelectionDiv.css('display'));
  },

  testAllOptionsShown: function () {
    OpponentSelection.create(this.opponentController).show();
    var allOptionDivs = $('.imageSelectionOption');
    assertEquals(2, allOptionDivs.length);
  },

  testOkCallsCallback: function () {
    var sel = OpponentSelection.create(this.opponentController);
    var called = false;
    sel.onOk(function () { called = true; });
    sel.show();
    this.okButton.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    this.okButton.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  },

  testBackCallsCallback: function () {
    var sel = OpponentSelection.create(this.opponentController);
    var called = false;
    sel.onBack(function () { called = true; });
    sel.show();
    this.backButton.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    this.backButton.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  }
});
