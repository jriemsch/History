net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Position = net.riemschneider.graphics.Position;
  var ImageData = net.riemschneider.graphics.ImageData;

  net.riemschneider.history.model.Region = {
    create: function create(id, imgData, difficultyPos) {
      ArgumentUtils.assertString(id);
      ArgumentUtils.assertType(imgData, net.riemschneider.graphics.ImageData);
      ArgumentUtils.assertType(difficultyPos, net.riemschneider.graphics.Position);

      return {
        getId: function getId() { return id; },
        getImgData: function getImgData() { return imgData; },
        getDifficultyPos: function getDifficultyPos() { return difficultyPos; }
      };
    },

    createFromState: function createFromState(state) {
      ArgumentUtils.assertNotNull(state);

      var imgPos = Position.create(state.imgPos.x, state.imgPos.y);
      var imgSize = Position.create(state.imgSize.x, state.imgSize.y);
      var imgData = ImageData.create(state.imgSrc, imgPos, imgSize);
      var difficultyPos = Position.create(state.difficultyPos.x, state.difficultyPos.y);
      return net.riemschneider.history.model.Region.create(state.id, imgData, difficultyPos);
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Region', net.riemschneider.history.model.Region);
}());
