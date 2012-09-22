net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  var Tap = net.riemschneider.gestures.Tap;
  var ImageUtils = net.riemschneider.graphics.ImageUtils;

  net.riemschneider.history.views.components.ImageMap = {
    create: function (parent) {
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
          var maskWrapper = $('<div></div>');
          var img = $('<img src="' + imgSrc + '">');

          img.load(function () {
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
          });

          maskWrapper.append(img);
          parent.append(maskWrapper);

          imageInfos.push({ maskWrapper: maskWrapper, img: img, onTapped: onTapped });

          return {
            addImageClass: function addImageClass(style) { img.addClass(style); },
            removeImageClass: function removeImageClass(style) { img.removeClass(style); },
            addMaskClass: function addMaskClass(style) { maskWrapper.addClass(style); },
            removeMaskClass: function removeMaskClass(style) { maskWrapper.removeClass(style); }
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
}());
