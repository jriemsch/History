net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ClosureUtils = net.riemschneider.utils.ClosureUtils;
  var AvatarImages = net.riemschneider.history.data.AvatarImages;

  net.riemschneider.history.views.components.ImageSelectionMultipleImagesDiv = {
    create: function create(imageInfos, backgroundClass) {
      ArgumentUtils.assertArray(imageInfos, function (elem) {
        ArgumentUtils.assertRange(elem.avatarImageIdx, 0, AvatarImages.getImageCount() - 1);
        ArgumentUtils.assertString(elem.name);
      });
      ArgumentUtils.assertString(backgroundClass);

      var optionDiv = $('<div class="imageSelectionOption imageSelectionWideOption"></div>');

      var backgroundGlow = $('<div class="imageSelectionBackgroundGlow ' + backgroundClass + '"></div>');
      optionDiv.append(backgroundGlow);

      var countDown = ClosureUtils.createCountDown(imageInfos.length, function () { optionDiv.show(); });

      for (var idx = 0, len = imageInfos.length; idx < len; ++idx) {
        appendImage(idx, imageInfos[idx]);
      }

      function appendImage(idx, imageInfo) {
        var imageDiv = $('<div class="imageSelectionImage' + idx + '"></div>');
        var avatarImage = AvatarImages.getImage(imageInfo.avatarImageIdx);
        var img = $('<img class="imageSelectionOptionImage" src=' + avatarImage + '></img>');
        optionDiv.hide();
        optionDiv.append(imageDiv);
        imageDiv.append(img);

        imageDiv.append($('<div class="imageSelectionOptionText"><p>' + imageInfo.name + '</p></div>'));

        img.load(countDown);
      }

      return optionDiv;
    }
  };
}());
