net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.model.Region = {
    create: function create(id, imgSrc, imgPos) {
      ArgumentUtils.assertNotNull(id);
      ArgumentUtils.assertString(imgSrc);
      ArgumentUtils.assertType(imgPos, net.riemschneider.graphics.Position);

      return {
        getId: function getId() { return id; },
        getImgSrc: function getImgSrc() { return imgSrc; },
        getImgPos: function getImgPos() { return imgPos; }
      };
    }
  };
}());
