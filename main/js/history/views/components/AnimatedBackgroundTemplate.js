net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Template = net.riemschneider.ui.Template;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.views.components.AnimatedBackgroundTemplate = {
    create: function (templateId, processorRegistry) {
      var template = Template.create(templateId, processorRegistry);

      template.onCloned = function onCloned(animatedBackground, data) {
        ArgumentUtils.assertRange(data.count, 1);
        ArgumentUtils.assertType(data.imageTemplate, net.riemschneider.ui.Template);

        for (var idx = 0; idx < data.count; ++idx) {
          animatedBackground.append(data.imageTemplate.clone({}));
        }
      };

      return template;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.views.components.AnimatedBackgroundTemplate', net.riemschneider.history.views.components.AnimatedBackgroundTemplate);
}());
