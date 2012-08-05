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

    $('body').append(this.topicSelectionDiv);
    this.topicSelectionDiv.append(this.topicsDiv);
    this.topicSelectionDiv.append(this.questionMarksTop);
    this.topicSelectionDiv.append(this.questionMarksBottom);
    this.topicSelectionDiv.append(this.buttonBarDiv);
    this.buttonBarDiv.append(this.okButton);

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

  testShow: function () {
    var sel = TopicSelection.create(this.topics, this.addOns);
    assertEquals('none', this.topicSelectionDiv.css('display'));
    sel.show();
    assertEquals('block', this.topicSelectionDiv.css('display'));
  },

  testAllImagesShown: function () {
    TopicSelection.create(this.topics, this.addOns).show();
    var allImages = $('.imageSelectionOptionImage');
    assertEquals(2, allImages.length);
  },

  testOkHidesView: function () {
    var done = false;
    TopicSelection.create(this.topics, this.addOns).show(function () {
      done = true;
    });
    this.okButton.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    this.okButton.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertEquals('none', this.topicSelectionDiv.css('display'));
    assertTrue(done);
  }
});
