net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ImageSelection = net.riemschneider.history.views.components.ImageSelection;
  var ImageSelectionImageDiv = net.riemschneider.history.views.components.ImageSelectionImageDiv;
  var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;
  var Tap = net.riemschneider.gestures.Tap;
  var Template = net.riemschneider.ui.Template;

  net.riemschneider.history.views.TopicSelection = {
    create: function create() {
      var template = Template.create('imageSelectionImageDiv');
      var questionMarksDivTop = $('#topicQuestionMarksTop');
      var questionMarksDivBottom = $('#topicQuestionMarksBottom');
      var topicsDiv = $('#topics');

      prepareButtonBar();

      var onBackCallback = function () {};
      var topicInfos = [];
      var imageSelection = null;

      function createImageSelection(topicInfos) {
        imageSelection = ImageSelection.create(topicsDiv, createTopicOptions(topicInfos));
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

      function createTopicOption(topicInfo) {
        var optionDiv = topicInfo.showLockOverlay ?
            ImageSelectionImageDiv.create(template, { image: topicInfo.image, text: topicInfo.name, overlay: 'images/lock.png' }, 0.4) :
            ImageSelectionImageDiv.create(template, { image: topicInfo.image, text: topicInfo.name });
        return {
          div: optionDiv,
          callback: function () { topicInfo.callback(); }
        };
      }

      function createTopicOptions(topicInfos) {
        var options = [];
        for (var idx = 0, len = topicInfos.length; idx < len; ++idx) {
          options[idx] = createTopicOption(topicInfos[idx]);
        }
        return options;
      }

      return {
        show: function show() {
          createImageSelection(topicInfos);
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
        onBack: function onBack(callback) {
          ArgumentUtils.assertFunction(callback);
          onBackCallback = callback;
        },
        setTopicInfos: function setTopicInfos(newTopicInfos) {
          ArgumentUtils.assertArray(newTopicInfos, function (info) {
            ArgumentUtils.assertString(info.name);
            ArgumentUtils.assertString(info.image);
            ArgumentUtils.assertBoolean(info.showLockOverlay);
            ArgumentUtils.assertFunction(info.callback);
          });
          topicInfos = newTopicInfos;
        }
      };
    }
  };
}());
