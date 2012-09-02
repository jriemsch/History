var ImageSelectionOpponentDiv = net.riemschneider.history.views.components.ImageSelectionOpponentDiv;
var Opponent = net.riemschneider.history.model.Opponent;
var Difficulty = net.riemschneider.history.model.Difficulty;

TestCase('ImageSelectionOpponentDivTest', {
  setUp: function () {
    this.pairing = {
      first: Opponent.create('OPP0', 'Hans Schenk', 0, Difficulty.EASY, [ 0.9, 0.8, 0.5 ], []),
      second: Opponent.create('OPP1', 'Günther Wernbach', 1, Difficulty.EASY, [ 0.95, 0.85, 0.7 ], [])
    };
  },

  testCreate: function () {
    var optionDiv = ImageSelectionOpponentDiv.create(this.pairing, Difficulty.MEDIUM);
    assertEquals(1, optionDiv.length);
    assertEquals('DIV', optionDiv[0].tagName);
    assertEquals(3, optionDiv.children().length);
    assertEquals('DIV', optionDiv.children()[0].tagName);
    assertEquals('DIV', optionDiv.children()[1].tagName);
    assertEquals('DIV', optionDiv.children()[2].tagName);
    assertEquals(4, optionDiv.children().children().length);
    assertEquals('IMG', optionDiv.children().children()[0].tagName);
    assertEquals('DIV', optionDiv.children().children()[1].tagName);
    assertEquals('IMG', optionDiv.children().children()[2].tagName);
    assertEquals('DIV', optionDiv.children().children()[3].tagName);
    assertEquals(2, optionDiv.children().children().children().length);
    assertEquals('Hans Schenk', $(optionDiv.children().children().children()[0]).text());
    assertEquals('Günther Wernbach', $(optionDiv.children().children().children()[1]).text());
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { ImageSelectionOpponentDiv.create(this.pairing, null); }, 'TypeError');
    assertException(function () { ImageSelectionOpponentDiv.create(null, Difficulty.MEDIUM); }, 'TypeError');
    assertException(function () { ImageSelectionOpponentDiv.create({ first: this.pairing.first }, Difficulty.MEDIUM); }, 'TypeError');
    assertException(function () { ImageSelectionOpponentDiv.create({ second: this.pairing.second }, Difficulty.MEDIUM); }, 'TypeError');

    assertException(function () { ImageSelectionOpponentDiv.create(this.pairing, 1); }, 'TypeError');
    assertException(function () { ImageSelectionOpponentDiv.create({ first: this.pairing.first, second: '' }, 1); }, 'TypeError');
    assertException(function () { ImageSelectionOpponentDiv.create({ first: '', second: this.pairing.second }, 1); }, 'TypeError');
  }
});
