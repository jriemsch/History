net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  var ImageSelection = net.riemschneider.history.views.components.ImageSelection;
  var ImageSelectionImageDiv = net.riemschneider.history.views.components.ImageSelectionImageDiv;
  var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;
  var Tap = net.riemschneider.gestures.Tap;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.views.TopicSelection = {
    create: function create(topicsById, addOns) {
      ArgumentUtils.assertMap(topicsById);
      ArgumentUtils.assertType(addOns, net.riemschneider.history.model.AddOns);

      var questionMarksDivTop = $('#topicQuestionMarksTop');
      var questionMarksDivBottom = $('#topicQuestionMarksBottom');
      var topicsDiv = $('#topics');

      prepareButtonBar();

      var onBackCallback = null;
      var onTopicSelectedCallback = null;
      var onLockedTopicSelectedCallback = null;
      var imageSelection = null;

      function createImageSelection() {
        var options = createTopicOptions();
        imageSelection = ImageSelection.create(topicsDiv, options);
      }

      function destroyImageSelection() {
        imageSelection.destroy();
        imageSelection = null;
      }

      function prepareButtonBar() {
        var backButton = $('#topicSelection').find('.footer .backButton');
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

      function createLockedTopicSelectionCallback(topic) {
        return function onLockedTopicSelected() {
          onLockedTopicSelectedCallback(topic.getId());
        }
      }

      function createTopicSelectionCallback(topic) {
        return function onTopicSelected() {
          onTopicSelectedCallback(topic.getId());
        }
      }

      function createTopicOptions() {
        var options = [];
        for (var topicId in topicsById) {
          if (topicsById.hasOwnProperty(topicId)) {
            var topic = topicsById[topicId];
            var isUnlocked = addOns.isUnlocked(topic.getId());
            var optionDiv = isUnlocked ?
                ImageSelectionImageDiv.create(topic.getImage(), topic.getName()) :
                ImageSelectionImageDiv.create(topic.getImage(), topic.getName(), 'images/lock.png', 0.4);
            options.push({
              div: optionDiv,
              callback: isUnlocked ? createTopicSelectionCallback(topic) : createLockedTopicSelectionCallback(topic)
            });
          }
        }
        return options;
      }

      return {
        show: function show() {
          createImageSelection();
          $('#topicSelection').show();
          AnimatedBackground.create(questionMarksDivTop, 3, 'images/questionMark.png');
          AnimatedBackground.create(questionMarksDivBottom, 3, 'images/questionMark.png');
          prepareOnResize();
        },
        hide: function hide() {
          destroyImageSelection();
          questionMarksDivTop.empty();
          questionMarksDivBottom.empty();
          $('#topicSelection').hide();
        },
        onBack: function onBack(callback) { onBackCallback = callback; },
        onTopicSelected: function onTopicSelected(callback) { onTopicSelectedCallback = callback; },
        onLockedTopicSelected: function onLockedTopicSelected(callback) { onLockedTopicSelectedCallback = callback; }
      };
    }
  };
}());
