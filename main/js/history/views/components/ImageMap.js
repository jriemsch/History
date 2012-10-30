net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  "use strict";

  var Tap = net.riemschneider.gestures.Tap;
  var ImageUtils = net.riemschneider.graphics.ImageUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.views.components.ImageMap = {
    create: function (parent) {
      ArgumentUtils.assertNotNull(parent);

      var tapHandler = Tap.create(parent, onParentTapped);
      var imageInfos = [];

      function onParentTapped(x, y) {
        var imageInfo = findFirstTapped();
        if (imageInfo) {
          imageInfo.onTapped();
        }

        function findFirstTapped() {
          for (var idx = 0, len = imageInfos.length; idx < len; ++idx) {
            var imageInfo = imageInfos[idx];
            var offset = imageInfo.img.offset();
            var height = imageInfo.img.outerHeight();
            var width = imageInfo.img.outerWidth();
            if (y >= offset.top && y < offset.top + height && x >= offset.left && x < offset.left + width) {
              var data = ImageUtils.getPixelFromImage(imageInfo.img, x - offset.left, y - offset.top);
              if (data[3] > 0) {
                return imageInfo;
              }
            }
          }
          return null;
        }
      }

      return {
        addImage: function addImage(imgSrc, imgPos, imgSize, onTapped) {
          ArgumentUtils.assertString(imgSrc);
          ArgumentUtils.assertType(imgPos, net.riemschneider.graphics.Position);
          ArgumentUtils.assertType(imgSize, net.riemschneider.graphics.Position);
          ArgumentUtils.assertFunction(onTapped);

          var maskWrapper = $('<div></div>');
          var img = $('<img src="' + imgSrc + '">');

          maskWrapper.css({
            position: 'absolute',
            left: imgPos.getX() + imgPos.getUnit().css,
            top: imgPos.getY() + imgPos.getUnit().css,
            width: imgSize.getX() + imgSize.getUnit().css,
            height: imgSize.getY() + imgSize.getUnit().css,
            webkitMaskBoxImage: 'url("' + imgSrc + '")'
          });

          img.css({
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
          });

          maskWrapper.append(img);
          parent.append(maskWrapper);

          imageInfos.push({ maskWrapper: maskWrapper, img: img, onTapped: onTapped });

          return {
            addImageClass: function addImageClass(style) { img.addClass(style); },
            addMaskClass: function addMaskClass(style) { maskWrapper.addClass(style); }
          };
        },

        destroy: function destroy() {
          tapHandler.remove();
          for (var idx = 0, len = imageInfos.length; idx < len; ++idx) {
            var imageInfo = imageInfos[idx];
            imageInfo.maskWrapper.remove();
          }
          imageInfos = [];
        }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.history.views.components.ImageMap', net.riemschneider.history.views.components.ImageMap);
}());
