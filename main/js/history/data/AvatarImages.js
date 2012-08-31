net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  net.riemschneider.history.data.AvatarImages = {
    getImageCount: function getImageCount() { return 30; },
    getImage: function getImage(idx) {
      return 'images/avatars/avatar' + (1000 + idx + "").slice(-3) + '.png';
    }
  };
}());
