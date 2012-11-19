net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ImageMap = net.riemschneider.history.views.components.ImageMap;
  var Position = net.riemschneider.graphics.Position;
  var RegionState = net.riemschneider.history.views.components.RegionState;

  net.riemschneider.history.views.components.DecoratedImageMap = {
    create: function (parent, backgroundImageData) {
      ArgumentUtils.assertNotNull(parent);
      ArgumentUtils.assertType(backgroundImageData, net.riemschneider.graphics.ImageData);

      var containerDiv = $('<div class="quizMapSelection"></div>');
      var imageMap = ImageMap.create(containerDiv);
      var mapElements = {};

      containerDiv.css({ backgroundImage: 'url("' + backgroundImageData.getImgSrc() + '")'});
      parent.append(containerDiv);

      function abs(pos) {
        var backgroundSize = backgroundImageData.getImgSize();
        var offsetX = (2048 - backgroundSize.getX()) / 2;
        var offsetY = (2048 - backgroundSize.getY()) / 2;
        return Position.create((pos.getX() + offsetX) * 100 / 2048, (pos.getY() + offsetY) * 100 / 2048, Position.Unit.PERCENT);
      }

      function rel(pos) {
        return Position.create(pos.getX() * 100 / 2048, pos.getY() * 100 / 2048, Position.Unit.PERCENT);
      }

      return {
        addImage: function addImage(imageId, imgData, labelPos, label, labelClass, onTapped) {
          ArgumentUtils.assertString(imageId);
          ArgumentUtils.assertType(imgData, net.riemschneider.graphics.ImageData);
          ArgumentUtils.assertFunction(onTapped);
          ArgumentUtils.assertNotNull(label);
          ArgumentUtils.assertString(labelClass);
          ArgumentUtils.assertType(labelPos, net.riemschneider.graphics.Position);

          var imgSrc = imgData.getImgSrc();
          var imgPos = abs(imgData.getImgPos());
          var imgSize = rel(imgData.getImgSize());
          var mapElement = imageMap.addImage(imgSrc, imgPos, imgSize, function () { onTapped(); });
          mapElement.addImageClass('quizRegion');
          mapElement.addMaskClass('quizMaskRegion');
          mapElement.addMaskClass('quizRegionUNCLAIMED');
          mapElements[imageId] = mapElement;

          var difficultyMarker = $('<div class="quizDifficultyMarker"></div>');
          var difficultyPos = rel(labelPos);
          difficultyMarker.css({
            left: imgPos.getX() + difficultyPos.getX() + imgPos.getUnit().css,
            top: imgPos.getY() + difficultyPos.getY() + imgPos.getUnit().css
          });
          difficultyMarker.addClass(labelClass);
          difficultyMarker.append(label);

          containerDiv.append(difficultyMarker);
        },
        destroy: function destroy() { containerDiv.remove(); },
        setRegionState: function setRegionState(imageId, regionState) {
          ArgumentUtils.assertString(imageId);
          ArgumentUtils.assertNotNull(mapElements[imageId]);
          ArgumentUtils.assertType(regionState, RegionState);

          mapElements[imageId].addMaskClass('quizRegion' + regionState.key);
        },
        flashRegion: function flashRegion(imageId) {
          ArgumentUtils.assertString(imageId);
          ArgumentUtils.assertNotNull(mapElements[imageId]);

          mapElements[imageId].addMaskClass('quizRegionSelectionFlash');
          setTimeout(function () { mapElements[imageId].removeMaskClass('quizRegionSelectionFlash'); }, 100);
        }
      };
    }
  };
}());
