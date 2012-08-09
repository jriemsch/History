var TopicSelection = net.riemschneider.history.views.TopicSelection;
var JQueryTestUtils = net.riemschneider.testutils.JQueryTestUtils;
var Topic = net.riemschneider.history.model.Topic;
var AddOns = net.riemschneider.history.model.AddOns;

TestCase('TopicSelectionTest', {
  setUp: function () {
    $('body').empty();

    this.topicSelectionDiv = $('<div id="topicSelection"></div>');
    this.topicsDiv = $('<div id="topics"></div>');
    this.questionMarksTop = $('<div id="topicQuestionMarksTop"></div>');
    this.questionMarksBottom = '<div id="topicQuestionMarksBottom"></div>';
    this.buttonBarDiv = $('<div class="footer"></div>');
    this.okButton = $('<div class="okButton"></div>');
    this.backButton = $('<div class="backButton"></div>');

    $('body').append(this.topicSelectionDiv);
    this.topicSelectionDiv.append(this.topicsDiv);
    this.topicSelectionDiv.append(this.questionMarksTop);
    this.topicSelectionDiv.append(this.questionMarksBottom);
    this.topicSelectionDiv.append(this.buttonBarDiv);
    this.buttonBarDiv.append(this.okButton);
    this.buttonBarDiv.append(this.backButton);

    this.topicSelectionDiv.hide();

    this.topics = [
        Topic.create('topic1', 'Topic1', '/test/images/test.png'),
        Topic.create('topic2', 'Topic2', '/test/images/test.png')
    ];

    this.addOns = AddOns.create();
    this.addOns.unlock('topic1');
  },

  tearDown: function () {
    $('body').empty();
  },

  testShowAndHide: function () {
    var sel = TopicSelection.create(this.topics, this.addOns);
    assertEquals('none', this.topicSelectionDiv.css('display'));
    sel.show();
    assertEquals('block', this.topicSelectionDiv.css('display'));
    sel.hide();
    assertEquals('none', this.topicSelectionDiv.css('display'));
  },

  testAllImagesShown: function () {
    TopicSelection.create(this.topics, this.addOns).show();
    var allImages = $('.imageSelectionOptionImage');
    assertEquals(2, allImages.length);
  },

  testOkCallsCallback: function () {
    var sel = TopicSelection.create(this.topics, this.addOns);
    var called = false;
    sel.onOk(function () { called = true; });
    sel.show();
    this.okButton.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    this.okButton.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  },

  testBackCallsCallback: function () {
    var sel = TopicSelection.create(this.topics, this.addOns);
    var called = false;
    sel.onBack(function () { called = true; });
    sel.show();
    this.backButton.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    this.backButton.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  }
});
