net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.Region = {
    create: function create(id, imgSrc, imgPos, imgSize, difficultyPos) {
      ArgumentUtils.assertNotNull(id);
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
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Region', net.riemschneider.history.model.Region);
}());
