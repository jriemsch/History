net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.Topic = {
    create: function create(id, name, image, mapImage) {
      ArgumentUtils.assertString(id);
      ArgumentUtils.assertString(name);
      ArgumentUtils.assertString(image);
      ArgumentUtils.assertString(mapImage);

      return {
        getId: function getId() { return id; },
        getName: function getName() { return name; },
        getImage: function getImage() { return image; },
        getMapImage: function getMapImage() { return mapImage; }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Topic', net.riemschneider.history.model.Topic);
}());
