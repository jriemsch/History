net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  var ImageSelection = net.riemschneider.history.views.components.ImageSelection;
  var ImageSelectionImageDiv = net.riemschneider.history.views.components.ImageSelectionImageDiv;
  var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;
  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.history.views.TopicSelection = {
    create: function create(topics, addOns) {
      var questionMarksDivTop = $('#topicQuestionMarksTop');
      var questionMarksDivBottom = $('#topicQuestionMarksBottom');
      var topicsDiv = $('#topics');
      createImageSelection();

      prepareButtonBar();

      var onOkCallback = null;
      var onBackCallback = null;
      var onLockedTopicSelectedCallback = null;

      function createImageSelection() {
        var options = createTopicOptions();
        ImageSelection.create(topicsDiv, options);
      }

      function prepareButtonBar() {
        var okButton = $('#topicSelection .footer .okButton');
        Tap.create(okButton, function() { onOkCallback(); }, false, 'okPressed');

        var backButton = $('#topicSelection .footer .backButton');
        Tap.create(backButton, function() { onBackCallback(); }, false, 'backPressed');
      }

      function prepareOnResize() {
        $(window).resize(function () {
          var height = window.innerHeight - topicsDiv.offset().top - topicsDiv.outerHeight() - 7;
          questionMarksDivTop.css({ top: 0, height: topicsDiv.offset().top });
          questionMarksDivBottom.css({ bottom: 0, height: height });
        });

        setTimeout(function () { $(window).resize(); }, 0);
      }

      function createLockedTopicSelectionCallback(topicId) {
        return function () {
          onLockedTopicSelectedCallback(topicId);
        }
      }

      function createTopicOptions() {
        var options = [];
        for (var idx = 0, len = topics.length; idx < len; ++idx) {
          var topic = topics[idx];
          var isUnlocked = addOns.isUnlocked(topic.getId());
          var optionDiv = isUnlocked ?
              ImageSelectionImageDiv.create(topic.getImage(), topic.getName()) :
              ImageSelectionImageDiv.create(topic.getImage(), topic.getName(), 'images/lock.png', 0.4);
          options[idx] = {
            div: optionDiv,
            callback: isUnlocked ? null : createLockedTopicSelectionCallback(topic.getId())
          };
        }
        return options;
      }

      return {
        show: function show() {
          $('#topicSelection').show();
          AnimatedBackground.create(questionMarksDivTop, 3, 'images/questionMark.png');
          AnimatedBackground.create(questionMarksDivBottom, 3, 'images/questionMark.png');
          prepareOnResize();
        },
        hide: function hide() {
          questionMarksDivTop.empty();
          questionMarksDivBottom.empty();
          $('#topicSelection').hide();
        },
        onOk: function onOk(callback) { onOkCallback = callback; },
        onBack: function onBack(callback) { onBackCallback = callback; },
        onLockedTopicSelected: function onLockedTopicSelected(callback) { onLockedTopicSelectedCallback = callback; }
      };
    }
  };
}());
