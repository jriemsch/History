net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Position = net.riemschneider.graphics.Position;
  var ImageData = net.riemschneider.graphics.ImageData;

  net.riemschneider.history.model.Topic = {
    create: function create(id, name, image, mapImgData, year) {
      ArgumentUtils.assertString(id);
      ArgumentUtils.assertString(name);
      ArgumentUtils.assertString(image);
      ArgumentUtils.assertType(mapImgData, ImageData);
      ArgumentUtils.assertNumber(year);

      return {
        getId: function getId() { return id; },
        getName: function getName() { return name; },
        getImage: function getImage() { return image; },
        getMapImgData: function getMapImgData() { return mapImgData; },
        getYear: function getYear() { return year; }
      };
    },

    createFromState: function createFromState(state) {
      ArgumentUtils.assertNotNull(state);
      var mapImgSize = Position.create(state.mapImageSize.x, state.mapImageSize.y);
      var mapImgData = ImageData.create(state.mapImageSrc, Position.ZERO, mapImgSize);
      return net.riemschneider.history.model.Topic.create(state.id, state.name, state.imgSrc, mapImgData, state.year);
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Topic', net.riemschneider.history.model.Topic);
}());
