var QuizPlayers = net.riemschneider.history.views.components.QuizPlayers;
var Opponent = net.riemschneider.history.model.Opponent;
var Player = net.riemschneider.history.model.Player;
var Difficulty = net.riemschneider.history.model.Difficulty;

TestCase('QuizPlayersTest', {
  setUp: function () {
    $('body').empty();
    var css = $('<style type="text/css"></style>');
    $('head').append(css);

    this.players = [
        Player.create('player', 0),
        Opponent.create('ID0', 'opp0', 1, Difficulty.EASY, [ 0.9, 0.5, 0.1 ], []),
        Opponent.create('ID1', 'opp1', 2, Difficulty.MEDIUM, [ 0.9, 0.5, 0.1 ], [])
    ];
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreate: function () {
    var quizPlayers = QuizPlayers.create($('body'), this.players);
    assertNotNull(quizPlayers);
    assertEquals(0, quizPlayers.getSelectedPlayer());
    var container = $('body').find('.quizPlayers');
    assertEquals(1, container.length);
    assertEquals(1, container.find('.quizPlayerHeightAdjuster').length);
    var players = container.find('.quizPlayer');
    assertEquals(3, players.length);

    this.checkPlayer($(players.get(0)), '000<br>player');
    this.checkPlayer($(players.get(1)), '000<br>opp0');
    this.checkPlayer($(players.get(2)), '000<br>opp1');

    assertEquals(1, $('body').find('.selected').length);
    this.checkPlayer($('body').find('.selected'), '000<br>player');
  },

  testCreateNullAndTypeSafe: function () {
    var players = this.players;

    assertException(function () { QuizPlayers.create($('body'), null); }, 'TypeError');
    assertException(function () { QuizPlayers.create(null, players); }, 'TypeError');

    assertException(function () { QuizPlayers.create($('body'), [ players[0] ]); }, 'TypeError');
    assertException(function () { QuizPlayers.create($('body'), [ players[0], players[1], players[2], players[0] ]); }, 'TypeError');
    assertException(function () { QuizPlayers.create($('body'), [ players[0], {}, players[1] ]); }, 'TypeError');
  },

  testDestroy: function () {
    var quizPlayers = QuizPlayers.create($('body'), this.players);
    quizPlayers.destroy();
    assertEquals(0, $('body').find('.quizPlayers').length);
  },

  testSelectPlayer: function () {
    var quizPlayers = QuizPlayers.create($('body'), this.players);
    quizPlayers.selectPlayer(1);
    assertEquals(1, $('body').find('.selected').length);
    this.checkPlayer($('body').find('.selected'), '000<br>opp0');
    assertEquals(1, quizPlayers.getSelectedPlayer());
  },

  testSelectNoPlayer: function () {
    var quizPlayers = QuizPlayers.create($('body'), this.players);
    quizPlayers.selectPlayer(null);
    assertEquals(0, $('body').find('.selected').length);
    assertNull(quizPlayers.getSelectedPlayer());
    quizPlayers.selectPlayer(2);
    assertEquals(2, quizPlayers.getSelectedPlayer());
  },

  testSelectPlayerNullAndTypeSafe: function () {
    var quizPlayers = QuizPlayers.create($('body'), this.players);
    var nothing;

    assertException(function () { quizPlayers.selectPlayer(nothing); }, 'TypeError');
    assertException(function () { quizPlayers.selectPlayer(4); }, 'TypeError');
  },

  testSetScore: function () {
    var quizPlayers = QuizPlayers.create($('body'), this.players);
    quizPlayers.setScore(1, 42);
    var container = $('body').find('.quizPlayers');
    var players = container.find('.quizPlayer');
    this.checkPlayer($(players.get(1)), '042<br>opp0');
  },

  testSetScoreNullAndTypeSafe: function () {
    var quizPlayers = QuizPlayers.create($('body'), this.players);

    assertException(function () { quizPlayers.setScore(0, null); }, 'TypeError');
    assertException(function () { quizPlayers.setScore(null, 0); }, 'TypeError');

    assertException(function () { quizPlayers.setScore(0, '123'); }, 'TypeError');
    assertException(function () { quizPlayers.setScore('0', 0); }, 'TypeError');
    assertException(function () { quizPlayers.setScore(0, -1); }, 'TypeError');
    assertException(function () { quizPlayers.setScore(0, 1000); }, 'TypeError');
    assertException(function () { quizPlayers.setScore(-1, 0); }, 'TypeError');
    assertException(function () { quizPlayers.setScore(3, 1000); }, 'TypeError');
  },

  checkPlayer: function checkPlayer(player, expectedScore) {
    assertEquals(1, player.find('.quizAvatar').length);
    var score = player.find('.quizPlayerScore');
    assertEquals(1, score.length);
    assertEquals(expectedScore, $(score).html());
  }
});