net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  var ImageSelection = net.riemschneider.history.views.components.ImageSelection;
  var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;
  var Tap = net.riemschneider.gestures.Tap;
  var ClosureUtils = net.riemschneider.utils.ClosureUtils;

  net.riemschneider.history.views.TopicSelection = {
    create: function (topics, addOns) {
      var questionMarksDivTop = $('#topicQuestionMarksTop');
      var questionMarksDivBottom = $('#topicQuestionMarksBottom');
      var topicsDiv = $('#topics');
      createImageSelection();

      prepareButtonBar();

      var onOkCallback = null;
      var onBackCallback = null;

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

      function createTopicOptions() {
        var options = [];
        for (var idx in topics) {
          var topic = topics[idx];
          var isUnlocked = addOns.isUnlocked(topic.getId());
          options[idx] = {
            imgSrc: topic.getImage(),
            name: topic.getName(),
            overlay: isUnlocked ? null : 'images/lock.png',
            imgOpacity: isUnlocked ? null : 0.4
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
        onBack: function onBack(callback) { onBackCallback = callback; }
      };
    }
  };
}());
