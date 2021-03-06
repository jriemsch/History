net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  "use strict";

  net.riemschneider.history.data.AvatarImages = {
    getImageCount: function getImageCount() { return 31; },
    getImage: function getImage(idx) {
      return 'images/avatars/avatar' + (1000 + idx + "").slice(-3) + '.png';
    }
  };
}());
