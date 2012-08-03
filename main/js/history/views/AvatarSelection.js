net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  var ImageSelection = net.riemschneider.history.views.components.ImageSelection;
  var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;
  var TouchUtils = net.riemschneider.utils.TouchUtils;
  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.history.views.AvatarSelection = {
    create: function (playerController) {
      var player = playerController.getPlayer();

      var questionMarksDivTop = $('#avatarQuestionMarksTop');
      var questionMarksDivBottom = $('#avatarQuestionMarksBottom');
      var avatarsDiv = $('#avatars');
      var imageSelection = createImageSelection();
      var nameDiv = $('#nameInput');
      var nameInput = $('#nameInput div input');

      prepareNameInput();
      prepareButtonBar();

      var onHide = null;

      function show(onHideCallback) {
        $('#avatarSelection').show();
        AnimatedBackground.create(questionMarksDivTop, 3, 'images/questionMark.png');
        AnimatedBackground.create(questionMarksDivBottom, 3, 'images/questionMark.png');
        imageSelection.setSelection(player.getAvatarImageIdx());
        prepareOnResize();
        onHide = onHideCallback;
      }

      function createImageSelection() {
        var options = createAvatarOptions();
        return ImageSelection.create(avatarsDiv, options);
      }

      function prepareButtonBar() {
        var okButton = $('#avatarSelection .footer .okButton');
        Tap.create(okButton, function () {
          player.setAvatarImageIdx(imageSelection.getSelection());
          player.setName(nameInput.val() || 'Mr. X');
          playerController.savePlayer();
          questionMarksDivTop.empty();
          questionMarksDivBottom.empty();
          $('#avatarSelection').hide();
          if (onHide) {
            onHide();
          }
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

      return {
        show: show
      };
    }
  };
}());
