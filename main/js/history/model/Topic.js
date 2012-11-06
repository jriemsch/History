net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Position = net.riemschneider.graphics.Position;

  net.riemschneider.history.model.Topic = {
    create: function create(id, name, image, mapImage, mapImageSize, year) {
      ArgumentUtils.assertString(id);
      ArgumentUtils.assertString(name);
      ArgumentUtils.assertString(image);
      ArgumentUtils.assertString(mapImage);
      ArgumentUtils.assertType(mapImageSize, Position);
      ArgumentUtils.assertNumber(year);

      return {
        getId: function getId() { return id; },
        getName: function getName() { return name; },
        getImage: function getImage() { return image; },
        getMapImage: function getMapImage() { return mapImage; },
        getMapImageSize: function getMapImageSize() { return mapImageSize; },
        getYear: function getYear() { return year; }
      };
    },

    createFromState: function createFromState(state) {
      ArgumentUtils.assertNotNull(state);
      var mapImageSize = Position.create(state.mapImageSize.x, state.mapImageSize.y);
      return net.riemschneider.history.model.Topic.create(
          state.id, state.name, state.imgSrc, state.mapImageSrc, mapImageSize, state.year);
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Topic', net.riemschneider.history.model.Topic);
}());
