net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.views.components.AnimatedBackground = {
    create: function (parent, count, template) {
      ArgumentUtils.assertNotNull(parent);
      ArgumentUtils.assertRange(count, 1);
      ArgumentUtils.assertType(template, net.riemschneider.ui.Template);

      for (var idx = 0; idx < count; ++idx) {
        parent.append(template.clone({}));
      }
    }
  };
}());
