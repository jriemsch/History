net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  var ImageSelection = net.riemschneider.history.views.components.ImageSelection;
  var ImageSelectionImageDiv = net.riemschneider.history.views.components.ImageSelectionImageDiv;
  var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;
  var TouchUtils = net.riemschneider.utils.TouchUtils;
  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.history.views.AvatarSelection = {
    create: function (playerController) {
      var questionMarksDivTop = $('#avatarQuestionMarksTop');
      var questionMarksDivBottom = $('#avatarQuestionMarksBottom');
      var avatarsDiv = $('#avatars');
      var imageSelection = createImageSelection();
      var nameDiv = $('#nameInput');
      var nameInput = $('#nameInput div input');

      prepareNameInput();
      prepareButtonBar();

      var onOkCallback = null;

      function createImageSelection() {
        var options = createAvatarOptions();
        return ImageSelection.create(avatarsDiv, options);
      }

      function prepareButtonBar() {
        var okButton = $('#avatarSelection .footer .okButton');
        Tap.create(okButton, function () { onOkCallback(); }, false, 'okPressed');
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
      }

      function createAvatarOptions() {
        var options = [];
        for (var idx = 0; idx <= 30; ++idx) {
          options[idx] = {
            div: ImageSelectionImageDiv.create('images/avatars/avatar' + (1000 + idx + "").slice(-3) + '.png')
          };
        }
        return options;
      }

      return {
        show: function show() {
          $('#avatarSelection').show();
          AnimatedBackground.create(questionMarksDivTop, 3, 'images/questionMark.png');
          AnimatedBackground.create(questionMarksDivBottom, 3, 'images/questionMark.png');

          var player = playerController.getPlayer();
          imageSelection.setSelection(player.getAvatarImageIdx());
          nameInput.val(player.getName());

          prepareOnResize();
        },
        hide: function hide() {
          questionMarksDivTop.empty();
          questionMarksDivBottom.empty();
          $('#avatarSelection').hide();
        },
        onOk: function onOk(callback) { onOkCallback = callback; },
        getAvatarImageIdx: function getAvatarImageIdx() { return imageSelection.getSelection(); },
        getName: function getName() { return nameInput.val(); }
      };
    }
  };
}());
