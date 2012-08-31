net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.views.components.ImageSelectionImageDiv = {
    create: function create(imgSrc, name, overlay, imgOpacity) {
      ArgumentUtils.assertString(imgSrc);

      var optionDiv = $('<div class="imageSelectionOption"></div>');

      var img = $('<img class="imageSelectionOptionImage" src=' + imgSrc + '></img>');
      optionDiv.hide();
      optionDiv.append(img);

      img.load(function () { optionDiv.show(); });

      if (name) {
        ArgumentUtils.assertString(name);
        optionDiv.append($('<div class="imageSelectionOptionText"><p>' + name + '</p></div>'));
      }

      if (overlay) {
        ArgumentUtils.assertString(overlay);
        optionDiv.append($('<img class="imageSelectionOptionOverlay" src=' + overlay + '></img>'));
      }

      if (imgOpacity) {
        ArgumentUtils.assertNumber(imgOpacity);
        img.css('opacity', imgOpacity);
      }

      return optionDiv;
    }
  };
}());
