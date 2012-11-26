net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Template = net.riemschneider.ui.Template;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.history.views.TopicSelectionTemplate = {
    create: function create(templateId, processorRegistry) {
      var template = Template.create(templateId, processorRegistry);

      template.onCloned = function onCloned(viewDiv, data) {
        ArgumentUtils.assertFunction(data.onBackCallback);

        prepareButtonBar();

        prepareOnResize();

        function prepareButtonBar() {
          var backButton = viewDiv.find('.footer .backButton');
          Tap.create(backButton, function() { data.onBackCallback(); }, false, 'backPressed');
        }

        function prepareOnResize() {
          var topicsDiv = viewDiv.find('.topics');
          var questionMarksDivTop = viewDiv.find('.topicQuestionMarksTop');
          var questionMarksDivBottom = viewDiv.find('.topicQuestionMarksBottom');

          $(window).resize(function () {
            var height = window.innerHeight - topicsDiv.offset().top - topicsDiv.outerHeight() - 7;
            questionMarksDivTop.css({ top: 0, height: topicsDiv.offset().top });
            questionMarksDivBottom.css({ bottom: 0, height: height });
          });

          setTimeout(function () { $(window).resize(); }, 0);
        }
      };

      return template;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.views.TopicSelectionTemplate', net.riemschneider.history.views.TopicSelectionTemplate);
}());
