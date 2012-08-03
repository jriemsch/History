net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.model.Topic = {
    create: function create(id, name, image) {
      ArgumentUtils.assertNotNull(id);
      ArgumentUtils.assertNotNull(name);
      ArgumentUtils.assertNotNull(image);

      return {
        getId: function getId() { return id; },
        getName: function getName() { return name; },
        getImage: function getImage() { return image; }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.history.model.Topic', net.riemschneider.history.model.Topic);
}());
