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
var ImageMap = net.riemschneider.history.views.components.ImageMap;
var AnswerComponentRegistry = net.riemschneider.history.views.components.AnswerComponentRegistry;

TestCase('QuizViewTest', {
  setUp: function () {
    this.createImageMapMock();

    $('body').empty();
    this.quizView = $('<div id="quizView"><div class="quizMap"></div></div>');
    $('body').append(this.quizView);
    this.quizView.hide();

    this.playerController = {
      getPlayer: function getPlayer() { return Player.create('player', 0); }
    };
    var pairing = {
      first: Opponent.create('OPP0', 'Hans Schenk', 0, Difficulty.EASY, [ 0.9, 0.8, 0.5 ], []),
      second: Opponent.create('OPP2', 'Martin Salm', 2, Difficulty.EASY, [ 0.8, 0.5, 0.2 ], [])
    };
    this.questionsByRegion = {
      R1: Question.create('Q1', Difficulty.EASY, 'question?', Answer.create(0)),
      R2: Question.create('Q2', Difficulty.EASY, 'question?', Answer.create(0))
    };
    var quiz = Quiz.create('topicId', pairing, Difficulty.EASY, this.questionsByRegion);
    this.quizController = {
      getCurrentQuiz: function getCurrentQuiz() { return quiz; }
    };
    var pos = Position.create(0, 0);
    this.regionsByTopic = {
      topicId: Regions.create([ Region.create('R1', 'R1src', pos, pos, pos),  Region.create('R2', 'R2src', pos, pos, pos)  ])
    };
    this.topicsById = {
      topicId: Topic.create('topicId', 'topic', 'image', 'mapImage', pos, 1900)
    };
	this.answerComponentRegistry = AnswerComponentRegistry.create();
  },

  tearDown: function () {
    $('body').empty();
    net.riemschneider.history.views.components.ImageMap.create = this.oldImageMapCreate;
  },

  testShowAndHide: function () {
    var view = QuizView.create(this.playerController, this.quizController, this.regionsByTopic, this.topicsById, this.answerComponentRegistry);
    assertEquals('none', this.quizView.css('display'));
    view.show();
    assertEquals('block', this.quizView.css('display'));
    view.hide();
    assertEquals('none', this.quizView.css('display'));
  },

  testRegionSelectedCalledIfCallbackWasSet: function () {
    var view = QuizView.create(this.playerController, this.quizController, this.regionsByTopic, this.topicsById, this.answerComponentRegistry);
    view.show();
    var selectedRegion = null;
    view.onRegionSelected(function (region) { selectedRegion = region; });
    this.createdImages[0].onTapped();
    assertEquals('R1', selectedRegion.getId());
  },

  testRegionSelectedNotCalledIfCallbackWasUnSet: function () {
    var view = QuizView.create(this.playerController, this.quizController, this.regionsByTopic, this.topicsById, this.answerComponentRegistry);
    view.show();
    var selectedRegion = null;
    view.onRegionSelected(function (region) { selectedRegion = region; });
    view.onRegionSelected(null);
    this.createdImages[0].onTapped();
    assertNull(selectedRegion);
  },

  testQuizSelectedRegionIdChangesClassOfImageWhileShown: function () {
    var view = QuizView.create(this.playerController, this.quizController, this.regionsByTopic, this.topicsById, this.answerComponentRegistry);
    view.show();
    this.quizController.getCurrentQuiz().setSelectedRegionId('R2');
    assertEquals('quizRegionUNCLAIMED', this.createdImages[0].lastMaskClass);
    assertEquals('quizRegionSELECTED', this.createdImages[1].lastMaskClass);
  },

  testQuizSelectedRegionIdDoesNotChangeClassOfImageWhileHidden: function () {
    var view = QuizView.create(this.playerController, this.quizController, this.regionsByTopic, this.topicsById, this.answerComponentRegistry);
    view.show();
    view.hide();
    this.quizController.getCurrentQuiz().setSelectedRegionId('R2');
    assertEquals('quizRegionUNCLAIMED', this.createdImages[0].lastMaskClass);
    assertEquals('quizRegionUNCLAIMED', this.createdImages[1].lastMaskClass);
  },

  testShowQuestion: function () {
    var view = QuizView.create(this.playerController, this.quizController, this.regionsByTopic, this.topicsById, this.answerComponentRegistry);
    view.show();
    view.showQuestion(this.questionsByRegion.R1);
    assertEquals('question?', $('body').find('.quizQuestion').text());
  },

  createImageMapMock: function () {
    this.oldImageMapCreate = ImageMap.create;
    var createdImages = [];
    this.createdImages = createdImages;
    ImageMap.create = function create(containerDiv) {
      assertTrue(containerDiv.hasClass('quizMapSelection'));
      return {
        addImage: function addImage(imgSrc, imgPos, imgSize, onTapped) {
          var img = {
            addImageClass: function addImageClass(style) { img.lastImageClass = style; },
            addMaskClass: function addMaskClass(style) { img.lastMaskClass = style; },
            imgSrc: imgSrc,
            imgPos: imgPos,
            imgSize: imgSize,
            onTapped: onTapped,
            lastImageClass: null,
            lastMaskClass: null
          };
          createdImages.push(img);
          return img;
        }
      };
    };
  }
});