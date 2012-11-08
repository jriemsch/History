net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ImageMap = net.riemschneider.history.views.components.ImageMap;
  var Position = net.riemschneider.graphics.Position;
  var Difficulty = net.riemschneider.history.model.Difficulty;
  var RegionState = net.riemschneider.history.views.components.RegionState;

  var difficultyClasses = {};
  difficultyClasses[Difficulty.EASY.key] = 'quizDifficultyEasy';
  difficultyClasses[Difficulty.MEDIUM.key] = 'quizDifficultyMedium';
  difficultyClasses[Difficulty.HARD.key] = 'quizDifficultyHard';

  net.riemschneider.history.views.components.QuizMapSelection = {
    create: function (parent, topic, regions, questionsByRegion, scoreByDifficulty, onTapped) {
      ArgumentUtils.assertNotNull(parent);
      ArgumentUtils.assertType(topic, net.riemschneider.history.model.Topic);
      ArgumentUtils.assertType(regions, net.riemschneider.history.model.Regions);
      ArgumentUtils.assertFunction(onTapped);
      ArgumentUtils.assertMap(questionsByRegion, function (key, value) {
        ArgumentUtils.assertNotNull(regions.getRegion(key));
        ArgumentUtils.assertType(value, net.riemschneider.history.model.Question);
      });

      var containerDiv = $('<div class="quizMapSelection"></div>');
      var imageMap = ImageMap.create(containerDiv);
      var regionArray = regions.getRegions();
      var mapElements = {};

      for (var idx = 0, len = regionArray.length; idx < len; ++idx) {
        var region = regionArray[idx];
        var imgSrc = region.getImgSrc();
        var imgPos = abs(region.getImgPos());
        var imgSize = rel(region.getImgSize());
        var mapElement = addImage(imgSrc, imgPos, imgSize, region);
        mapElement.addImageClass('quizRegion');
        mapElement.addMaskClass('quizMaskRegion');
        mapElement.addMaskClass('quizRegionUNCLAIMED');
        mapElements[region.getId()] = mapElement;

        var difficultyMarker = $('<div class="quizDifficultyMarker"></div>');
        var difficultyPos = rel(region.getDifficultyPos());
        difficultyMarker.css({
          left: imgPos.getX() + difficultyPos.getX() + imgPos.getUnit().css,
          top: imgPos.getY() + difficultyPos.getY() + imgPos.getUnit().css
        });
        var question = questionsByRegion[region.getId()];
        ArgumentUtils.assertType(question, net.riemschneider.history.model.Question);
        var difficulty = question.getDifficulty();
        difficultyMarker.addClass(difficultyClasses[difficulty.key]);
        difficultyMarker.append(scoreByDifficulty[difficulty.key]);

        containerDiv.append(difficultyMarker);
      }

      containerDiv.css({ backgroundImage: 'url("' + topic.getMapImage() + '")'});
      parent.append(containerDiv);

      function abs(pos) {
        var offsetX = (2048 - topic.getMapImageSize().getX()) / 2;
        var offsetY = (2048 - topic.getMapImageSize().getY()) / 2;
        return Position.create((pos.getX() + offsetX) * 100 / 2048, (pos.getY() + offsetY) * 100 / 2048, Position.Unit.PERCENT);
      }

      function rel(pos) {
        return Position.create(pos.getX() * 100 / 2048, pos.getY() * 100 / 2048, Position.Unit.PERCENT);
      }

      function addImage(imgSrc, imgPos, imgSize, region) {
        return imageMap.addImage(imgSrc, imgPos, imgSize, function () { onTapped(region); });
      }

      return {
        destroy: function destroy() { containerDiv.remove(); },
        setRegionState: function setRegionState(regionId, regionState) {
          ArgumentUtils.assertString(regionId);
          ArgumentUtils.assertNotNull(mapElements[regionId]);
          ArgumentUtils.assertType(regionState, RegionState);

          mapElements[regionId].addMaskClass('quizRegion' + regionState.key);
        },
        flashRegion: function flashRegion(regionId) {
          ArgumentUtils.assertString(regionId);
          ArgumentUtils.assertNotNull(mapElements[regionId]);

          mapElements[regionId].addMaskClass('quizRegionSelectionFlash');
          setTimeout(function () { mapElements[regionId].removeMaskClass('quizRegionSelectionFlash'); }, 100);
        }
      };
    }
  };
}());
