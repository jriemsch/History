net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Template = net.riemschneider.ui.Template;

  net.riemschneider.history.views.SelectionTemplate = {
    create: function create(templateId, processorRegistry) {
      var template = Template.create(templateId, processorRegistry);

      template.onCloned = function onCloned(selectionDiv) {
        prepareOnResize();

        function prepareOnResize() {
          var questionMarksDivTop = selectionDiv.find('.questionMarksTop');
          var questionMarksDivBottom = selectionDiv.find('.questionMarksBottom');
          var itemsDiv = selectionDiv.find('.items');

          $(window).resize(function () {
            var height = window.innerHeight - itemsDiv.offset().top - itemsDiv.outerHeight() - 7;
            questionMarksDivTop.css({ top: 0, height: itemsDiv.offset().top });
            questionMarksDivBottom.css({ bottom: 0, height: height });
          });

          setTimeout(function () { $(window).resize(); }, 0);
        }
      };

      return template;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.views.SelectionTemplate', net.riemschneider.history.views.SelectionTemplate);
}());
