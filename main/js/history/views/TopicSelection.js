net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.history.views.TopicSelection = {
    create: function create(templates) {
      ArgumentUtils.assertType(templates.imageSelectionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.lockedTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.unlockedTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.backgroundImageTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.backgroundTemplate, net.riemschneider.ui.Template);

      var questionMarksDivTop = $('#topicQuestionMarksTop');
      var questionMarksDivBottom = $('#topicQuestionMarksBottom');
      var topicsDiv = $('#topics');

      prepareButtonBar();

      var onBackCallback = function () {};
      var topicInfos = [];
      var imageSelectionDiv = null;

      function createImageSelection(topicInfos) {
        for (var idx = 0, len = topicInfos.length; idx < len; ++idx) {
          var topicInfo = topicInfos[idx];
          topicInfo.template = topicInfo.showLockOverlay ? templates.lockedTemplate : templates.unlockedTemplate;
        }

        imageSelectionDiv = templates.imageSelectionTemplate.clone({ options: topicInfos });
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

      return {
        show: function show() {
          createImageSelection(topicInfos);
          $('#topicSelection').show();
          var backgroundData = { count: 3, imageTemplate: templates.backgroundImageTemplate };
          questionMarksDivTop.append(templates.backgroundTemplate.clone(backgroundData));
          questionMarksDivBottom.append(templates.backgroundTemplate.clone(backgroundData));
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
