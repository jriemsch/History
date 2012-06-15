net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  var ImageSelection = net.riemschneider.history.views.components.ImageSelection;
  var TouchUtils = net.riemschneider.utils.TouchUtils;

  net.riemschneider.history.views.AvatarSelection = {
    create: function (playerController) {
      var player = playerController.getPlayer();

      var questionMarksDivTop = $('#questionMarksTop');
      var questionMarksDivBottom = $('#questionMarksBottom');
      var avatarsDiv = $('#avatars');
      var imageSelection = createImageSelection();
      var nameDiv = $('#nameInput');
      var nameInput = $('#nameInput div input');

      createQuestionMarks();
      prepareNameInput();
      prepareOnResize();
      prepareButtonBar();

      return {
        show: function show() {
          $('#avatarSelection').show();
        }
      };

      function createImageSelection() {
        var options = createAvatarOptions();
        var imageSelection = ImageSelection.create(avatarsDiv, options);
        imageSelection.setSelection(player.getAvatarImageIdx());
        return imageSelection;
      }

      function prepareButtonBar() {
        TouchUtils.onTap($('#avatarSelection .buttonBar .okButton'), function () {
          player.setAvatarImageIdx(imageSelection.getSelection());
          player.setName(nameInput.val() || 'Mr. X');
          playerController.savePlayer();
        }, false, 'okPressed');
      }

      function prepareOnResize() {
        $(window).resize(function () {
          var height = nameDiv.offset().top - 1;
          questionMarksDivTop.css({ top: 0, height: height });

          height = window.innerHeight - avatarsDiv.offset().top - avatarsDiv.outerHeight() - 7;
          questionMarksDivBottom.css({ bottom: 0, height: height });
        });

        setTimeout(function () { $(window).resize(); }, 0);
      }

      function prepareNameInput() {
        nameInput.keydown(function (event) {
          if (event.which === 13) {
            nameInput.blur();
          }
        });

        TouchUtils.onTouchStart($(document), function () {
          nameInput.blur();
        });

        nameInput.val(player.getName());
      }

      function createAvatarOptions() {
        var options = [];
        for (var idx = 0; idx <= 30; ++idx) {
          options[idx] = {
            imgSrc: 'images/avatars/avatar' + (1000 + idx + "").slice(-3) + '.png'
          };
        }
        return options;
      }

      function createQuestionMarks() {
        for (var idx = 0; idx < 3; ++idx) {
          createQuestionMark(questionMarksDivTop);
        }
        for (idx = 0; idx < 3; ++idx) {
          createQuestionMark(questionMarksDivBottom);
        }
      }

      function createQuestionMark(questionMarksDiv) {
        var questionMarkDiv = $('<img src="images/questionMark.png" class="questionMark">');
        questionMarksDiv.append(questionMarkDiv);

        var scale = Math.random() * 0.5 + 1;

        var prevLeft = Math.random() * 100;
        var prevTop = Math.random() * 100;
        var prevAngle = Math.random() * 360;

        questionMarkDiv.css({
          webkitTransform: 'translate3d(0,0,0) rotate(' + prevAngle + 'deg) scale(' + scale + ')',
          left: prevLeft + '%',
          top: prevTop + '%',
          opacity: Math.random() * 0.1 + 0.1
        });

        setTimeout(moveAndRotateQuestionMark, 0);

        function moveAndRotateQuestionMark() {
          var angle = prevAngle + Math.random() * 60;
          var left = Math.random() * 100;
          var top = Math.random() * 100;
          var dx = left - prevLeft;
          var dy = top - prevTop;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var duration = dist * 200;
          questionMarkDiv.css({
            left: left + '%',
            top: top + '%',
            webkitTransform: 'translate3d(0,0,0) rotate(' + angle + 'deg) scale(' + scale + ')',
            webkitTransitionDuration: duration + 'ms'
          });
          prevLeft = left;
          prevTop = top;
          prevAngle = angle;
          setTimeout(moveAndRotateQuestionMark, duration);
        }
      }
    }
  };
}());