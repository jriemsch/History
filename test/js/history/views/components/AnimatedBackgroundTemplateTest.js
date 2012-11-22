var AnimatedBackgroundTemplate = net.riemschneider.history.views.components.AnimatedBackgroundTemplate;

var Clock = net.riemschneider.utils.Clock;
var JQueryTestUtils = net.riemschneider.testutils.JQueryTestUtils;
var Template = net.riemschneider.ui.Template;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('AnimatedBackgroundTemplateTest', {
  setUp: function () {
    Clock.reset();
    $('body').empty();

    this.backgoundTemplateDiv = $('<img src="test.png" data-template-id="templateId" class="background"></div>');

    this.parent = $('<div></div>');

    $('body').append(this.backgoundTemplateDiv);
    $('body').append(this.parent);

    this.cssRecorder = JQueryTestUtils.startRecording('css');
    JQueryTestUtils.clearRecording(this.cssRecorder);

    this.templateProcessorRegistry = TemplateProcessorRegistry.create();
  },

  tearDown: function () {
    $('body').empty();
    JQueryTestUtils.stopRecording(this.cssRecorder);
  },

  testCreate: function () {
    var template = AnimatedBackgroundTemplate.create('templateId', this.templateProcessorRegistry);
    assertTrue(TypeUtils.isOfType(template, Template));
    assertTrue(TypeUtils.isOfType(template, AnimatedBackgroundTemplate));
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { AnimatedBackgroundTemplate.create('templateId', null); }, 'TypeError');
    assertException(function () { AnimatedBackgroundTemplate.create(null, this.templateProcessorRegistry); }, 'TypeError');

    assertException(function () { AnimatedBackgroundTemplate.create({}, this.templateProcessorRegistry); }, 'TypeError');
  },

  testClone: function () {
    var template = AnimatedBackgroundTemplate.create('templateId', this.templateProcessorRegistry);
    var clone = template.clone({});
    assertEquals('test.png', clone.attr('src'));
  },

  testImageLocationsChangeAfterTimeout: function () {
    var template = AnimatedBackgroundTemplate.create('templateId', this.templateProcessorRegistry);
    var clone = template.clone({});
    var leftBefore = this.getLastLeftChange(clone[0]);
    Clock.setTime(1000);
    var leftAfter = this.getLastLeftChange(clone[0]);
    assertTrue(leftBefore !== leftAfter);
  },

  getLastLeftChange: function getLastLeftChange(image) {
    var isLeftChange = function (recording) {
      return recording.obj[0] === image && recording.args[0].left;
    };
    var lastRecording = JQueryTestUtils.getLastRecording(this.cssRecorder, isLeftChange);
    return lastRecording.args[0].left;
  }
});
