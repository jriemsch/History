net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Template = net.riemschneider.ui.Template;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TouchUtils = net.riemschneider.utils.TouchUtils;
  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.history.views.AvatarSelectionTemplate = {
    create: function create(templateId, processorRegistry) {
      var template = Template.create(templateId, processorRegistry);

      template.onCloned = function onCloned(avatarSelectionDiv, data) {
        ArgumentUtils.assertFunction(data.onOkCallback);

        var questionMarksDivTop = avatarSelectionDiv.find('.avatarQuestionMarksTop');
        var questionMarksDivBottom = avatarSelectionDiv.find('.avatarQuestionMarksBottom');
        var avatarsDiv = avatarSelectionDiv.find('.avatars');
        var nameDiv = avatarSelectionDiv.find('.nameInput');
        var nameInput = nameDiv.find('div input');

        prepareNameInput();
        prepareButtonBar();

        prepareOnResize();

        function prepareNameInput() {
          nameInput.keydown(function (event) {
            if (event.which === 13) {
              nameInput.blur();
            }
          });

          TouchUtils.onTouchStart($(document), function () {
            nameInput.blur();
          });

          if (data.selectedName) {
            nameInput.val(data.selectedName);
          }

          data.getName = function getName() { return nameInput.val(); };
        }

        function prepareButtonBar() {
          var okButton = avatarSelectionDiv.find('.footer .okButton');
          Tap.create(okButton, function () { data.onOkCallback(); }, false, 'okPressed');
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
      };

      return template;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.views.AvatarSelectionTemplate', net.riemschneider.history.views.AvatarSelectionTemplate);
}());
