var TopicSelection = net.riemschneider.history.views.TopicSelection;
var Topic = net.riemschneider.history.model.Topic;
var AddOns = net.riemschneider.history.model.AddOns;
var Position = net.riemschneider.graphics.Position;

TestCase('TopicSelectionTest', {
  setUp: function () {
    $('body').empty();

    this.opponentSelectionDiv = $('<div id="topicSelection"></div>');
    this.opponentsDiv = $('<div id="topics"></div>');
    this.questionMarksTop = $('<div id="topicQuestionMarksTop"></div>');
    this.questionMarksBottom = '<div id="topicQuestionMarksBottom"></div>';
    this.buttonBarDiv = $('<div class="footer"></div>');
    this.okButton = $('<div class="okButton"></div>');
    this.backButton = $('<div class="backButton"></div>');

    $('body').append(this.opponentSelectionDiv);
    this.opponentSelectionDiv.append(this.opponentsDiv);
    this.opponentSelectionDiv.append(this.questionMarksTop);
    this.opponentSelectionDiv.append(this.questionMarksBottom);
    this.opponentSelectionDiv.append(this.buttonBarDiv);
    this.buttonBarDiv.append(this.backButton);

    this.opponentSelectionDiv.hide();

    this.topicsById = {
      topic1: Topic.create('topic1', 'Topic1', '/test/images/test.png', '/test/images/test.png', Position.create(1, 1), 1900),
      topic2: Topic.create('topic2', 'Topic2', '/test/images/test.png', '/test/images/test.png', Position.create(1, 1), 1901)
    };

    this.addOns = AddOns.create();
    this.addOns.unlock('topic1');
  },

  tearDown: function () {
    $('body').empty();
  },

  testShowAndHide: function () {
    var sel = TopicSelection.create(this.topicsById, this.addOns);
    assertEquals('none', this.opponentSelectionDiv.css('display'));
    sel.show();
    assertEquals('block', this.opponentSelectionDiv.css('display'));
    sel.hide();
    assertEquals('none', this.opponentSelectionDiv.css('display'));
  },

  testAllImagesShown: function () {
    TopicSelection.create(this.topicsById, this.addOns).show();
    assertEquals(2, $('.imageSelectionOptionImage').length);
    assertEquals(1, $('.imageSelectionOptionOverlay').length);
  },

  testTopicsAreSorted: function () {
    this.topicsById.topic3 = Topic.create('topic3', 'Topic3', '/test/images/test.png', '/test/images/test.png', Position.create(1, 1), 1800);
    this.topicsById.topic4 = Topic.create('topic4', 'Topic4', '/test/images/test.png', '/test/images/test.png', Position.create(1, 1), 1801);
    this.addOns.unlock('topic3');

    TopicSelection.create(this.topicsById, this.addOns).show();
    var texts = $('.imageSelectionOptionText');
    assertEquals(4, texts.length);
    assertEquals('Topic3', $(texts[0]).find('p').text());
    assertEquals('Topic1', $(texts[1]).find('p').text());
    assertEquals('Topic4', $(texts[2]).find('p').text());
    assertEquals('Topic2', $(texts[3]).find('p').text());
  },

  testCanShowNewTopicState: function () {
    var sel = TopicSelection.create(this.topicsById, this.addOns);
    sel.show();
    sel.hide();
    this.addOns.unlock('topic2');
    sel.show();
    assertEquals(0, $('.imageSelectionOptionOverlay').length);
  },

  testBackCallsCallback: function () {
    var sel = TopicSelection.create(this.topicsById, this.addOns);
    var called = false;
    sel.onBack(function () { called = true; });
    sel.show();
    this.backButton.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    this.backButton.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  },

  testSelectLockedTopicCallsCallback: function () {
    var sel = TopicSelection.create(this.topicsById, this.addOns);
    var called = null;
    sel.onLockedTopicSelected(function (topic) { called = topic; });
    sel.show();
    var allImages = $('.imageSelectionOptionImage');
    $(allImages[1]).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    $(allImages[1]).trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertEquals('topic2', called);
  },

  testSelectUnlockedTopicCallsCallback: function () {
    var sel = TopicSelection.create(this.topicsById, this.addOns);
    var called = null;
    sel.onTopicSelected(function (topic) { called = topic; });
    sel.show();
    var allImages = $('.imageSelectionOptionImage');
    $(allImages[0]).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    $(allImages[0]).trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertEquals('topic1', called);
  },

  testCreateNullAndTypeSafe: function () {
    var topicsById = this.topicsById;
    var addOns = this.addOns;

    assertException(function () { TopicSelection.create(topicsById, null);  }, 'TypeError');
    assertException(function () { TopicSelection.create(null, addOns);  }, 'TypeError');

    assertException(function () { TopicSelection.create(topicsById, {});  }, 'TypeError');
    assertException(function () { TopicSelection.create([], addOns);  }, 'TypeError');
  }
});
