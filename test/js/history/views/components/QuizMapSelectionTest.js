var QuizMapSelection = net.riemschneider.history.views.components.QuizMapSelection;
var Topic = net.riemschneider.history.model.Topic;
var Position = net.riemschneider.graphics.Position;
var Region = net.riemschneider.history.model.Region;
var Regions = net.riemschneider.history.model.Regions;
var Question = net.riemschneider.history.model.Question;
var Answer = net.riemschneider.history.model.Answer;
var Difficulty = net.riemschneider.history.model.Difficulty;
var ImageMap = net.riemschneider.history.views.components.ImageMap;

TestCase('QuizMapSelectionTest', {
  setUp: function () {
    this.createImageMapMock();

    $('body').empty();
    var css = $('<style type="text/css"></style>');
    $('head').append(css);

    var pos = Position.create(1280, 256);
    this.topic = Topic.create('topic', 'Topic', 'image', 'mapImage', pos);

    var region1 = Region.create('R1', 'src1', Position.create(128, 128), Position.create(256, 128), Position.create(10, 20));
    var region2 = Region.create('R2', 'src2', Position.create(64, 256), Position.create(512, 1024), Position.create(20, 10));
    this.regions = Regions.create([region1, region2]);

    this.questionsByRegion = {
      R1: Question.create('Q1', Difficulty.EASY, 'question?', Answer.create(0)),
      R2: Question.create('Q2', Difficulty.MEDIUM, 'question?', Answer.create(0))
    };

    this.scoreByDifficulty = {};
    this.scoreByDifficulty[Difficulty.EASY.key] = 5;
    this.scoreByDifficulty[Difficulty.MEDIUM.key] = 10;
    this.scoreByDifficulty[Difficulty.HARD.key] = 20;

    this.cssRecorder = JQueryTestUtils.startRecording('css');
    JQueryTestUtils.clearRecording(this.cssRecorder);
  },

  tearDown: function () {
    $('body').empty();
    net.riemschneider.history.views.components.ImageMap.create = this.oldImageMapCreate;
    JQueryTestUtils.stopRecording(this.cssRecorder);
  },

  testCreate: function () {
    var onTapped = function () {};
    var selection = QuizMapSelection.create($('body'), this.topic, this.regions, this.questionsByRegion, this.scoreByDifficulty, onTapped);
    assertNotNull(selection);
    var container = $('body').find('.quizMapSelection');
    assertEquals(1, container.length);
    assertEquals('url("mapImage")', this.getLastRecording(container).arguments[0].backgroundImage);
    assertEquals(2, this.createdImages.length);
    assertEquals('src1', this.createdImages[0].imgSrc);
    assertEquals('src2', this.createdImages[1].imgSrc);
    assertTrue(Position.create(25, 50, Position.Unit.PERCENT).equals(this.createdImages[0].imgPos));
    assertTrue(Position.create(21.875, 56.25, Position.Unit.PERCENT).equals(this.createdImages[1].imgPos));
    assertTrue(Position.create(12.5, 6.25, Position.Unit.PERCENT).equals(this.createdImages[0].imgSize));
    assertTrue(Position.create(25, 50, Position.Unit.PERCENT).equals(this.createdImages[1].imgSize));
    assertEquals('quizRegion', this.createdImages[0].lastImageClass);
    assertEquals('quizRegion', this.createdImages[1].lastImageClass);
    assertEquals('quizRegionUnclaimed', this.createdImages[0].lastMaskClass);
    assertEquals('quizRegionUnclaimed', this.createdImages[1].lastMaskClass);
    assertSame(onTapped, this.createdImages[0].onTapped);
    assertSame(onTapped, this.createdImages[1].onTapped);
    var difficultyMarkers = container.find('.quizDifficultyMarker');
    assertEquals(2, difficultyMarkers.length);
    assertEquals('35%', this.getLastRecording($(difficultyMarkers[0])).arguments[0].left);
    assertEquals('70%', this.getLastRecording($(difficultyMarkers[0])).arguments[0].top);
    assertEquals('41.875%', this.getLastRecording($(difficultyMarkers[1])).arguments[0].left);
    assertEquals('66.25%', this.getLastRecording($(difficultyMarkers[1])).arguments[0].top);
  },

  testCreateNullAndTypeSafe: function () {
    var onTapped = function () {};

    assertException(function () { QuizMapSelection.create($('body'), this.topic, this.regions, this.questionsByRegion, this.scoreByDifficulty, null); }, 'TypeError');
    assertException(function () { QuizMapSelection.create($('body'), this.topic, this.regions, this.questionsByRegion, null, onTapped); }, 'TypeError');
    assertException(function () { QuizMapSelection.create($('body'), this.topic, this.regions, null, this.scoreByDifficulty, onTapped); }, 'TypeError');
    assertException(function () { QuizMapSelection.create($('body'), this.topic, null, this.questionsByRegion, this.scoreByDifficulty, onTapped); }, 'TypeError');
    assertException(function () { QuizMapSelection.create($('body'), null, this.regions, this.questionsByRegion, this.scoreByDifficulty, onTapped); }, 'TypeError');
    assertException(function () { QuizMapSelection.create(null, this.topic, this.regions, this.questionsByRegion, this.scoreByDifficulty, onTapped); }, 'TypeError');

    assertException(function () { QuizMapSelection.create($('body'), this.topic, this.regions, this.questionsByRegion, this.scoreByDifficulty, 'callback'); }, 'TypeError');
    assertException(function () { QuizMapSelection.create($('body'), this.topic, this.regions, this.questionsByRegion, [], onTapped); }, 'TypeError');
    assertException(function () { QuizMapSelection.create($('body'), this.topic, this.regions, [], this.scoreByDifficulty, onTapped); }, 'TypeError');
    assertException(function () { QuizMapSelection.create($('body'), this.topic, [], this.questionsByRegion, this.scoreByDifficulty, onTapped); }, 'TypeError');
    assertException(function () { QuizMapSelection.create($('body'), {}, this.regions, this.questionsByRegion, this.scoreByDifficulty, onTapped); }, 'TypeError');

    assertException(function () { QuizMapSelection.create($('body'), this.topic, this.regions, {}, this.scoreByDifficulty, onTapped); }, 'TypeError');
    assertException(function () { QuizMapSelection.create($('body'), this.topic, this.regions, { R1: {}, R2: {} }, this.scoreByDifficulty, onTapped); }, 'TypeError');
  },

  testDestroy: function () {
    var onTapped = function () {};
    var selection = QuizMapSelection.create($('body'), this.topic, this.regions, this.questionsByRegion, this.scoreByDifficulty, onTapped);
    selection.destroy();
    assertEquals(0, $('body').children().length);
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
  },

  getLastRecording: function getLastRecording(obj) {
    return JQueryTestUtils.getLastRecording(this.cssRecorder, JQueryTestUtils.matchRecordingByObj(obj));
  }
});