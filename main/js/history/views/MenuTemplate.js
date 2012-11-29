net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Template = net.riemschneider.ui.Template;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.views.MenuTemplate = {
    create: function create(templateId, processorRegistry) {
      var template = Template.create(templateId, processorRegistry);

      template.onCloned = function onCloned(menuDiv, data) {
        ArgumentUtils.assertArray(data.options, function (elem) { ArgumentUtils.assertType(elem.template, Template); });

        createMenuOptions();

        function createMenuOptions() {
          var menuOptionsDiv = menuDiv.find('.menuOptions');
          for (var idx = 0, len = data.options.length; idx < len; ++idx) {
            var option = data.options[idx];
            var optionDiv = option.template.clone(option);
            menuOptionsDiv.append(optionDiv);
          }
        }
      };

      return template;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.views.MenuTemplate', net.riemschneider.history.views.MenuTemplate);
}());
