net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var AvatarImages = net.riemschneider.history.data.AvatarImages;
  var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;
  var TouchUtils = net.riemschneider.utils.TouchUtils;
  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.history.views.AvatarSelection = {
    create: function (imageSelectionTemplate, avatarTemplate, backgroundTemplate) {
      ArgumentUtils.assertType(imageSelectionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(avatarTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(backgroundTemplate, net.riemschneider.ui.Template);

      var questionMarksDivTop = $('#avatarQuestionMarksTop');
      var questionMarksDivBottom = $('#avatarQuestionMarksBottom');
      var avatarsDiv = $('#avatars');
      var imageSelectionDiv = createImageSelectionDiv();
      var nameDiv = $('#nameInput');
      var nameInput = nameDiv.find('div input');

      prepareNameInput();
      prepareButtonBar();

      var onOkCallback = function () {};

      function createImageSelectionDiv() {
        var imageSelectionDiv = imageSelectionTemplate.clone({ options: createAvatarOptions() });
        avatarsDiv.append(imageSelectionDiv);
        return imageSelectionDiv;
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
          options[idx] = { div: avatarTemplate.clone({ image: AvatarImages.getImage(idx) }) };
        }
        return options;
      }

      return {
        show: function show() {
          $('#avatarSelection').show();
          AnimatedBackground.create(questionMarksDivTop, 3, backgroundTemplate);
          AnimatedBackground.create(questionMarksDivBottom, 3, backgroundTemplate);

          prepareOnResize();
        },
        hide: function hide() {
          questionMarksDivTop.empty();
          questionMarksDivBottom.empty();
          $('#avatarSelection').hide();
        },
        onOk: function onOk(callback) { onOkCallback = callback; },
        setAvatarImageIdx: function setAvatarImageIdx(avatarImageIdx) { imageSelectionDiv.setSelection(avatarImageIdx); },
        getAvatarImageIdx: function getAvatarImageIdx() { return imageSelectionDiv.getSelection(); },
        setName: function setName(name) { nameInput.val(name); },
        getName: function getName() { return nameInput.val(); }
      };
    }
  };
}());
