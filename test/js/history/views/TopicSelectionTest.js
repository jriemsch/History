var TopicSelection = net.riemschneider.history.views.TopicSelection;

TestCase('TopicSelectionTest', {
  setUp: function () {
    $('body').empty();

    this.lockedTemplateDiv = $('<div data-template-id="lockedTopicImageSelectionDiv"></div>');
    this.lockedTemplateDiv.append('<img data-id="image" data-attr="src" class="imageClass">');
    this.lockedTemplateDiv.append('<div data-id="text" data-attr="text"></div>');
    this.lockedTemplateDiv.append('<img data-id="overlay" data-attr="src" class="overlay">');

    this.unlockedTemplateDiv = $('<div data-template-id="unlockedTopicImageSelectionDiv"></div>');
    this.unlockedTemplateDiv.append('<img data-id="image" data-attr="src" class="imageClass">');
    this.unlockedTemplateDiv.append('<div data-id="text" data-attr="text"></div>');

    this.topicSelectionDiv = $('<div id="topicSelection"></div>');
    this.topicsDiv = $('<div id="topics"></div>');
    this.questionMarksTop = $('<div id="topicQuestionMarksTop"></div>');
    this.questionMarksBottom = '<div id="topicQuestionMarksBottom"></div>';
    this.buttonBarDiv = $('<div class="footer"></div>');
    this.okButton = $('<div class="okButton"></div>');
    this.backButton = $('<div class="backButton"></div>');

    $('body').append(this.lockedTemplateDiv);
    $('body').append(this.unlockedTemplateDiv);
    $('body').append(this.topicSelectionDiv);
    this.topicSelectionDiv.append(this.topicsDiv);
    this.topicSelectionDiv.append(this.questionMarksTop);
    this.topicSelectionDiv.append(this.questionMarksBottom);
    this.topicSelectionDiv.append(this.buttonBarDiv);
    this.buttonBarDiv.append(this.backButton);

    this.topicSelectionDiv.hide();

    this.topicInfos = [
      {
        called: false,
        name: 'Topic1',
        image: '/test/images/test.png',
        showLockOverlay: false,
        callback: function () { this.called = true; }
      },
      {
        called: false,
        name: 'Topic2',
        image: '/test/images/test.png',
        showLockOverlay: true,
        callback: function () { this.called = true; }
      }
    ];
  },

  tearDown: function () {
    $('body').empty();
  },

  testShowAndHide: function () {
    var sel = TopicSelection.create();
    sel.setTopicInfos(this.topicInfos);
    assertEquals('none', this.topicSelectionDiv.css('display'));
    sel.show();
    assertEquals('block', this.topicSelectionDiv.css('display'));
    sel.hide();
    assertEquals('none', this.topicSelectionDiv.css('display'));
  },

  testAllImagesShown: function () {
    var sel = TopicSelection.create();
    sel.setTopicInfos(this.topicInfos);
    sel.show();
    assertEquals(2, this.topicSelectionDiv.find('.imageClass').length);
    assertEquals(1, this.topicSelectionDiv.find('.overlay').length);
  },

  testCanShowNewTopicState: function () {
    var sel = TopicSelection.create();
    sel.setTopicInfos(this.topicInfos);
    sel.show();
    sel.hide();
    this.topicInfos[1].showLockOverlay = false;
    sel.show();
    assertEquals(0, this.topicSelectionDiv.find('.overlay').length);
  },

  testBackCallsCallback: function () {
    var sel = TopicSelection.create();
    sel.setTopicInfos(this.topicInfos);
    var called = false;
    sel.onBack(function () { called = true; });
    sel.show();
    this.backButton.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    this.backButton.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  },

  testSelectTopicCallsCallback: function () {
    var sel = TopicSelection.create();
    sel.setTopicInfos(this.topicInfos);
    sel.show();
    var allImages = this.topicSelectionDiv.find('.imageClass');
    $(allImages[0]).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    $(allImages[0]).trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(this.topicInfos[0].called);
  },

  testSetTopicInfosNullAndTypeSafe: function () {
    var sel = TopicSelection.create();
    var callback = function () {};

    assertException(function () { sel.setTopicInfos(null); }, 'TypeError');

    assertException(function () { sel.setTopicInfos({}); }, 'TypeError');

    assertException(function () { sel.setTopicInfos([ { name: 'name', image: 'img', showLockOverlay: false } ]); }, 'TypeError');
    assertException(function () { sel.setTopicInfos([ { name: 'name', image: 'img', callback: callback } ]); }, 'TypeError');
    assertException(function () { sel.setTopicInfos([ { name: 'name', showLockOverlay: false, callback: callback } ]); }, 'TypeError');
    assertException(function () { sel.setTopicInfos([ { image: 'img', showLockOverlay: false, callback: callback } ]); }, 'TypeError');

    assertException(function () { sel.setTopicInfos([ { name: 'name', image: 'img', showLockOverlay: false, callback: 1 } ]); }, 'TypeError');
    assertException(function () { sel.setTopicInfos([ { name: 'name', image: 'img', showLockOverlay: 1, callback: callback } ]); }, 'TypeError');
    assertException(function () { sel.setTopicInfos([ { name: 'name', image: 1, showLockOverlay: false, callback: callback } ]); }, 'TypeError');
    assertException(function () { sel.setTopicInfos([ { name: 1, image: 'img', showLockOverlay: false, callback: callback } ]); }, 'TypeError');
  }
});
