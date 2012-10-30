var QuizView = net.riemschneider.history.views.QuizView;
var Quiz = net.riemschneider.history.model.Quiz;
var Opponent = net.riemschneider.history.model.Opponent;
var Difficulty = net.riemschneider.history.model.Difficulty;
var Question = net.riemschneider.history.model.Question;
var Player = net.riemschneider.history.model.Player;
var Regions = net.riemschneider.history.model.Regions;
var Region = net.riemschneider.history.model.Region;
var Position = net.riemschneider.graphics.Position;
var Topic = net.riemschneider.history.model.Topic;
var Answer = net.riemschneider.history.model.Answer;

TestCase('QuizViewTest', {
  setUp: function () {
    $('body').empty();
    this.quizView = $('<div id="quizView"></div>');
    $('body').append(this.quizView);
    this.quizView.hide();
  },

  tearDown: function () {
    $('body').empty();
  },

  testShowAndHide: function () {
    var playerController = {
      getPlayer: function getPlayer() { return Player.create('player', 0); }
    };
    var pairing = {
      first: Opponent.create('OPP0', 'Hans Schenk', 0, Difficulty.EASY, [ 0.9, 0.8, 0.5 ], []),
      second: Opponent.create('OPP2', 'Martin Salm', 2, Difficulty.EASY, [ 0.8, 0.5, 0.2 ], [])
    };
    var questionsByRegion = {
      R1: Question.create('Q1', Difficulty.EASY, 'question?', Answer.create(0)),
      R2: Question.create('Q2', Difficulty.EASY, 'question?', Answer.create(0))
    };
    var quizController = {
      getCurrentQuiz: function getCurrentQuiz() { return Quiz.create('topicId', pairing, Difficulty.EASY, questionsByRegion); }
    };
    var pos = Position.create(0, 0);
    var regionsByTopic = {
      topicId: Regions.create([ Region.create('R1', 'R1src', pos, pos, pos),  Region.create('R2', 'R2src', pos, pos, pos)  ])
    };
    var topicsById = {
      topicId: Topic.create('topicId', 'topic', 'image', 'mapImage', pos)
    };
    var menu = QuizView.create(playerController, quizController, regionsByTopic, topicsById);
    assertEquals('none', this.quizView.css('display'));
    menu.show();
    assertEquals('block', this.quizView.css('display'));
    menu.hide();
    assertEquals('none', this.quizView.css('display'));
  }
});