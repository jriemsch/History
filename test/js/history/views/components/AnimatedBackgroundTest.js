var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;

var Clock = net.riemschneider.utils.Clock;
var JQueryTestUtils = net.riemschneider.testutils.JQueryTestUtils;

TestCase('AnimatedBackgroundTest', {
  setUp: function () {
    Clock.reset();
    $('body').empty();
    var css = $('<style type="text/css">' +
        '.animatedBackgroundImage { position: absolute; }' +
        '</style>');
    $('head').append(css);
    this.cssRecorder = JQueryTestUtils.startRecording('css');
    JQueryTestUtils.clearRecording(this.cssRecorder);
  },

  tearDown: function () {
    $('body').empty();
    JQueryTestUtils.stopRecording(this.cssRecorder);
  },

  testCreate: function () {
    AnimatedBackground.create($('body'), 2, '/test/images/test.png');
    var images = $('body').find('.animatedBackgroundImage');
    assertEquals(2, images.length);
    assertTrue(images[0].src.indexOf('/test/images/test.png') >= 0);
    assertTrue(images[1].src.indexOf('/test/images/test.png') >= 0);
  },

  testImageLocationsChangeAfterTimeout: function () {
    AnimatedBackground.create($('body'), 2, '/test/images/test.png');
    var images = $('body').find('.animatedBackgroundImage');
    var leftBefore = this.getLastLeftChange(images[0]);
    Clock.setTime(1000);
    var leftAfter = this.getLastLeftChange(images[0]);
    assertTrue(leftBefore !== leftAfter);
  },

  getLastLeftChange: function getLastLeftChange(image) {
    var isLeftChange = function (recording) {
      return recording.obj[0] === image && recording.arguments[0].left;
    };
    var lastRecording = JQueryTestUtils.getLastRecording(this.cssRecorder, isLeftChange);
    return lastRecording.arguments[0].left;
  }
});
