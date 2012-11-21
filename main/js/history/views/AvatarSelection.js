net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  "use strict";

  var AvatarImages = net.riemschneider.history.data.AvatarImages;
  var ImageSelection = net.riemschneider.history.views.components.ImageSelection;
  var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;
  var TouchUtils = net.riemschneider.utils.TouchUtils;
  var Tap = net.riemschneider.gestures.Tap;
  var Template = net.riemschneider.ui.Template;

  net.riemschneider.history.views.AvatarSelection = {
    create: function () {
      var template = Template.create('avatarImageSelectionDiv');
      var questionMarksDivTop = $('#avatarQuestionMarksTop');
      var questionMarksDivBottom = $('#avatarQuestionMarksBottom');
      var avatarsDiv = $('#avatars');
      var imageSelection = createImageSelection();
      var nameDiv = $('#nameInput');
      var nameInput = nameDiv.find('div input');

      prepareNameInput();
      prepareButtonBar();

      var onOkCallback = function () {};

      function createImageSelection() {
        var options = createAvatarOptions();
        return ImageSelection.create(avatarsDiv, options);
      }

      function prepareButtonBar() {
        var okButton = $('#avatarSelection').find('.footer .okButton');
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
        for (var idx = 0; idx < AvatarImages.getImageCount(); ++idx) {
          options[idx] = { div: template.clone({ image: AvatarImages.getImage(idx) }).getClone() };
        }
        return options;
      }

      return {
        show: function show() {
          $('#avatarSelection').show();
          AnimatedBackground.create(questionMarksDivTop, 3, 'images/questionMark.png');
          AnimatedBackground.create(questionMarksDivBottom, 3, 'images/questionMark.png');

          prepareOnResize();
        },
        hide: function hide() {
          questionMarksDivTop.empty();
          questionMarksDivBottom.empty();
          $('#avatarSelection').hide();
        },
        onOk: function onOk(callback) { onOkCallback = callback; },
        setAvatarImageIdx: function setAvatarImageIdx(avatarImageIdx) { imageSelection.setSelection(avatarImageIdx); },
        getAvatarImageIdx: function getAvatarImageIdx() { return imageSelection.getSelection(); },
        setName: function setName(name) { nameInput.val(name); },
        getName: function getName() { return nameInput.val(); }
      };
    }
  };
}());
