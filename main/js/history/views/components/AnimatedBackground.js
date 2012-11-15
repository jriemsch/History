net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  "use strict";

  var Clock = net.riemschneider.utils.Clock;

  net.riemschneider.history.views.components.AnimatedBackground = {
    create: function (parent, count, imageSrc) {
      for (var idx = 0; idx < count; ++idx) {
        createAnimatedBackgroundImage();
      }

      function createAnimatedBackgroundImage() {
        var animatedBackgroundImage = $('<img src="' + imageSrc + '" class="animatedBackgroundImage">');
        parent.append(animatedBackgroundImage);

        var scale = Math.random() * 0.5 + 1;

        var prevLeft = Math.random() * 100;
        var prevTop = Math.random() * 100;
        var prevAngle = Math.random() * 360;

        animatedBackgroundImage.css({
          webkitTransform: 'translate3d(0,0,0) rotate(' + prevAngle + 'deg) scale(' + scale + ')',
          left: prevLeft + '%',
          top: prevTop + '%',
          opacity: Math.random() * 0.1 + 0.1
        });

        Clock.setTimeout(moveAndRotate, 0);

        function moveAndRotate() {
          var angle = prevAngle + Math.random() * 60;
          var left = Math.random() * 100;
          var top = Math.random() * 100;
          var dx = left - prevLeft;
          var dy = top - prevTop;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var duration = dist * 200;
          animatedBackgroundImage.css({
            left: left + '%',
            top: top + '%',
            webkitTransform: 'translate3d(0,0,0) rotate(' + angle + 'deg) scale(' + scale + ')',
            webkitTransitionDuration: duration + 'ms'
          });
          prevLeft = left;
          prevTop = top;
          prevAngle = angle;
          Clock.setTimeout(moveAndRotate, duration);
        }
      }
    }
  }
}());