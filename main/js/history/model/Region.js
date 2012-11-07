net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Position = net.riemschneider.graphics.Position;

  net.riemschneider.history.model.Region = {
    create: function create(id, imgSrc, imgPos, imgSize, difficultyPos) {
      ArgumentUtils.assertString(id);
      ArgumentUtils.assertString(imgSrc);
      ArgumentUtils.assertType(imgPos, net.riemschneider.graphics.Position);
      ArgumentUtils.assertType(imgSize, net.riemschneider.graphics.Position);
      ArgumentUtils.assertType(difficultyPos, net.riemschneider.graphics.Position);

      return {
        getId: function getId() { return id; },
        getImgSrc: function getImgSrc() { return imgSrc; },
        getImgPos: function getImgPos() { return imgPos; },
        getImgSize: function getImgSize() { return imgSize; },
        getDifficultyPos: function getDifficultyPos() { return difficultyPos; }
      };
    },

    createFromState: function createFromState(state) {
      ArgumentUtils.assertNotNull(state);

      var imgPos = Position.create(state.imgPos.x, state.imgPos.y);
      var imgSize = Position.create(state.imgSize.x, state.imgSize.y);
      var difficultyPos = Position.create(state.difficultyPos.x, state.difficultyPos.y);
      return net.riemschneider.history.model.Region.create(state.id, state.imgSrc, imgPos, imgSize, difficultyPos);
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Region', net.riemschneider.history.model.Region);
}());
