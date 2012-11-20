net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.views.components.ImageSelectionImageDiv = {
    create: function create(template, data, imgOpacity) {
      ArgumentUtils.assertType(template, net.riemschneider.ui.Template);
      ArgumentUtils.assertNotNull(data);
      ArgumentUtils.assertNotNull(data.image);

      var clone = template.clone(data);
      var optionDiv = clone.getClone();
      optionDiv.hide();

      var img = clone.getElement('image');
      img.load(function () { optionDiv.show(); });

      if (imgOpacity) {
        ArgumentUtils.assertNumber(imgOpacity);
        img.css('opacity', imgOpacity);
      }

      return optionDiv;
    }
  };
}());
