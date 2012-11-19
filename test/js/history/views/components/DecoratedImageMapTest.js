var RegionState = net.riemschneider.history.views.components.RegionState;
var DecoratedImageMap = net.riemschneider.history.views.components.DecoratedImageMap;
var Topic = net.riemschneider.history.model.Topic;
var Position = net.riemschneider.graphics.Position;
var ImageData = net.riemschneider.graphics.ImageData;
var Region = net.riemschneider.history.model.Region;
var Question = net.riemschneider.history.model.Question;
var Answer = net.riemschneider.history.model.Answer;
var Difficulty = net.riemschneider.history.model.Difficulty;
var ImageMap = net.riemschneider.history.views.components.ImageMap;
var JQueryTestUtils = net.riemschneider.testutils.JQueryTestUtils;

TestCase('DecoratedImageMapTest', {
  setUp: function () {
    this.createImageMapMock();

    $('body').empty();
    var css = $('<style type="text/css"></style>');
    $('head').append(css);

    var pos = Position.create(1280, 256);
    this.backgroundData = ImageData.create('mapImage', Position.ZERO, pos);

    this.imgData1 = ImageData.create('src1', Position.create(128, 128), Position.create(256, 128));
    this.imgData2 = ImageData.create('src2', Position.create(64, 256), Position.create(512, 1024));

    this.cssRecorder = JQueryTestUtils.startRecording('css');
    JQueryTestUtils.clearRecording(this.cssRecorder);
  },

  tearDown: function () {
    $('body').empty();
    net.riemschneider.history.views.components.ImageMap.create = this.oldImageMapCreate;
    JQueryTestUtils.stopRecording(this.cssRecorder);
  },

  testCreate: function () {
    var selection = DecoratedImageMap.create($('body'), this.backgroundData);
    assertNotNull(selection);
    var container = $('body').find('.quizMapSelection');
    assertEquals(1, container.length);
    assertEquals('url("mapImage")', this.getLastRecording(container).args[0].backgroundImage);
  },

  testCreateNullAndTypeSafe: function () {
    var backgroundData = this.backgroundData;
    assertException(function () { DecoratedImageMap.create($('body'), null); }, 'TypeError');
    assertException(function () { DecoratedImageMap.create(null, backgroundData); }, 'TypeError');

    assertException(function () { DecoratedImageMap.create($('body'), {}); }, 'TypeError');
  },

  testAddImage: function () {
    var selection = DecoratedImageMap.create($('body'), this.backgroundData);
    var onTapped = function () {};
    selection.addImage('R1', this.imgData1, Position.create(512, 256), 5, 'labelClass', onTapped);
    selection.addImage('R2', this.imgData2, Position.create(128, 64), 5, 'labelClass', onTapped);
    var container = $('body').find('.quizMapSelection');
    assertEquals(2, this.createdImages.length);
    assertEquals('src1', this.createdImages[0].imgSrc);
    assertEquals('src2', this.createdImages[1].imgSrc);
    assertTrue(Position.create(25, 50, Position.Unit.PERCENT).equals(this.createdImages[0].imgPos));
    assertTrue(Position.create(21.875, 56.25, Position.Unit.PERCENT).equals(this.createdImages[1].imgPos));
    assertTrue(Position.create(12.5, 6.25, Position.Unit.PERCENT).equals(this.createdImages[0].imgSize));
    assertTrue(Position.create(25, 50, Position.Unit.PERCENT).equals(this.createdImages[1].imgSize));
    assertEquals('quizRegion', this.createdImages[0].lastImageClass);
    assertEquals('quizRegion', this.createdImages[1].lastImageClass);
    assertEquals('quizRegionUNCLAIMED', this.createdImages[0].lastMaskClass);
    assertEquals('quizRegionUNCLAIMED', this.createdImages[1].lastMaskClass);
    var difficultyMarkers = container.find('.quizDifficultyMarker');
    assertEquals(2, difficultyMarkers.length);
    assertEquals('50%', this.getLastRecording($(difficultyMarkers[0])).args[0].left);
    assertEquals('62.5%', this.getLastRecording($(difficultyMarkers[0])).args[0].top);
    assertEquals('28.125%', this.getLastRecording($(difficultyMarkers[1])).args[0].left);
    assertEquals('59.375%', this.getLastRecording($(difficultyMarkers[1])).args[0].top);
  },

  testAddImageNullAndTypeSafe: function () {
    var onTapped = function () {};
    var selection = DecoratedImageMap.create($('body'), this.backgroundData);
    var imgData = this.imgData1;
    var labelPos = Position.ZERO;

    assertException(function () { selection.addImage('R1', imgData, labelPos, 5, 'labelClass', null); }, 'TypeError');
    assertException(function () { selection.addImage('R1', imgData, labelPos, 5, null, onTapped); }, 'TypeError');
    assertException(function () { selection.addImage('R1', imgData, labelPos, null, 'labelClass', onTapped); }, 'TypeError');
    assertException(function () { selection.addImage('R1', imgData, null, 5, 'labelClass', onTapped); }, 'TypeError');
    assertException(function () { selection.addImage('R1', null, labelPos, 5, 'labelClass', onTapped); }, 'TypeError');
    assertException(function () { selection.addImage(null, imgData, labelPos, 5, 'labelClass', onTapped); }, 'TypeError');

    assertException(function () { selection.addImage('R1', imgData, labelPos, 5, 'labelClass', 'callback'); }, 'TypeError');
    assertException(function () { selection.addImage('R1', imgData, labelPos, 5, 3, onTapped); }, 'TypeError');
    assertException(function () { selection.addImage('R1', imgData, {}, 5, 'labelClass', onTapped); }, 'TypeError');
    assertException(function () { selection.addImage('R1', {}, labelPos, 5, 'labelClass', onTapped); }, 'TypeError');
    assertException(function () { selection.addImage(1, imgData, labelPos, 5, 'labelClass', onTapped); }, 'TypeError');
  },

  testDestroy: function () {
    var selection = DecoratedImageMap.create($('body'), this.backgroundData);
    selection.addImage('R1', this.imgData1, Position.create(512, 256), 5, 'labelClass', function () {});
    selection.destroy();
    assertEquals(0, $('body').children().length);
  },

  testTapping: function () {
    var tappedRegion = null;
    var selection = DecoratedImageMap.create($('body'), this.backgroundData);
    selection.addImage('R1', this.imgData1, Position.create(512, 256), 5, 'labelClass', function () { tappedRegion = 'R1'; });
    selection.addImage('R2', this.imgData2, Position.create(128, 64), 5, 'labelClass', function () { tappedRegion = 'R2'; });
    this.createdImages[0].onTapped();
    assertEquals('R1', tappedRegion);
    this.createdImages[1].onTapped();
    assertEquals('R2', tappedRegion);
  },

  testSetRegionState: function () {
    var selection = DecoratedImageMap.create($('body'), this.backgroundData);
    var onTapped = function () {};
    selection.addImage('R1', this.imgData1, Position.create(512, 256), 5, 'labelClass', onTapped);
    selection.addImage('R2', this.imgData2, Position.create(128, 64), 5, 'labelClass', onTapped);
    selection.setRegionState('R2', RegionState.OWNED_PLAYER0);
    assertEquals('quizRegionUNCLAIMED', this.createdImages[0].lastMaskClass);
    assertEquals('quizRegionOWNED_PLAYER0', this.createdImages[1].lastMaskClass);
  },

  testSetRegionStateNullAndTypeSafe: function () {
    var selection = DecoratedImageMap.create($('body'), this.backgroundData);
    var onTapped = function () {};
    selection.addImage('R1', this.imgData1, Position.create(512, 256), 5, 'labelClass', onTapped);
    selection.addImage('R2', this.imgData2, Position.create(128, 64), 5, 'labelClass', onTapped);

    assertException(function () { selection.setRegionState('R2', null); }, 'TypeError');
    assertException(function () { selection.setRegionState(null, RegionState.OWNED_PLAYER0); }, 'TypeError');

    assertException(function () { selection.setRegionState('R2', 'state'); }, 'TypeError');
    assertException(function () { selection.setRegionState(2, RegionState.OWNED_PLAYER0); }, 'TypeError');
    assertException(function () { selection.setRegionState('other', RegionState.OWNED_PLAYER0); }, 'TypeError');
  },

  testFlashRegion: function () {
    var selection = DecoratedImageMap.create($('body'), this.backgroundData);
    var onTapped = function () {};
    selection.addImage('R1', this.imgData1, Position.create(512, 256), 5, 'labelClass', onTapped);
    selection.addImage('R2', this.imgData2, Position.create(128, 64), 5, 'labelClass', onTapped);
    selection.flashRegion('R2');
    assertEquals('quizRegionUNCLAIMED', this.createdImages[0].lastMaskClass);
    assertEquals('quizRegionSelectionFlash', this.createdImages[1].lastMaskClass);
  },

  testFlashRegionNullAndTypeSafe: function () {
    var selection = DecoratedImageMap.create($('body'), this.backgroundData);
    var onTapped = function () {};
    selection.addImage('R1', this.imgData1, Position.create(512, 256), 5, 'labelClass', onTapped);
    selection.addImage('R2', this.imgData2, Position.create(128, 64), 5, 'labelClass', onTapped);

    assertException(function () { selection.flashRegion(null); }, 'TypeError');

    assertException(function () { selection.flashRegion(2); }, 'TypeError');
    assertException(function () { selection.flashRegion('other'); }, 'TypeError');
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