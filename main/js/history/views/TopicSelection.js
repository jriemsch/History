net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ImageSelection = net.riemschneider.history.views.components.ImageSelection;
  var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;
  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.history.views.TopicSelection = {
    create: function create(imageSelectionTemplate, lockedTemplate, unlockedTemplate, backgroundTemplate) {
      ArgumentUtils.assertType(imageSelectionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(lockedTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(unlockedTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(backgroundTemplate, net.riemschneider.ui.Template);

      var questionMarksDivTop = $('#topicQuestionMarksTop');
      var questionMarksDivBottom = $('#topicQuestionMarksBottom');
      var topicsDiv = $('#topics');

      prepareButtonBar();

      var onBackCallback = function () {};
      var topicInfos = [];
      var imageSelectionDiv = null;

      function createImageSelection(topicInfos) {
        imageSelectionDiv = imageSelectionTemplate.clone({ options: createTopicOptions(topicInfos) });
        topicsDiv.append(imageSelectionDiv);
      }

      function destroyImageSelection() {
        imageSelectionDiv.remove();
        imageSelectionDiv = null;
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
        var template = topicInfo.showLockOverlay ? lockedTemplate : unlockedTemplate;
        return { div: template.clone(topicInfo), callback: function () { topicInfo.callback(); } };
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
          AnimatedBackground.create(questionMarksDivTop, 3, backgroundTemplate);
          AnimatedBackground.create(questionMarksDivBottom, 3, backgroundTemplate);
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
