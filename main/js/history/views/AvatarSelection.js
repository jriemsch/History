net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var AvatarImages = net.riemschneider.history.data.AvatarImages;

  net.riemschneider.history.views.AvatarSelection = {
    create: function (parent, templates) {
      ArgumentUtils.assertNotNull(parent);

      ArgumentUtils.assertType(templates.avatarSelectionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.imageSelectionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.avatarImageSelectionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.backgroundImageTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.backgroundTemplate, net.riemschneider.ui.Template);

      var avatarSelectionDiv = null;
      var viewData = null;

      var onOkCallback = function () {};
      var selectedAvatarImageIdx;
      var selectedName;

      return {
        show: function show() {
          viewData = {
            imageSelection: createImageSelectionData(),
            background: {
              template: templates.backgroundTemplate,
              count: 3,
              imageTemplate: templates.backgroundImageTemplate
            },
            selectedName: selectedName,
            onOkCallback: onOkCallback
          };
          avatarSelectionDiv = templates.avatarSelectionTemplate.clone(viewData);
          parent.append(avatarSelectionDiv);

          function createImageSelectionData() {
            var options = [];
            for (var idx = 0; idx < AvatarImages.getImageCount(); ++idx) {
              options[idx] = { template: templates.avatarImageSelectionTemplate, image: AvatarImages.getImage(idx) };
            }

            return {
              options: options,
              selectedImageIdx: selectedAvatarImageIdx,
              template: templates.imageSelectionTemplate
            };
          }
        },
        hide: function hide() { avatarSelectionDiv.remove(); },
        onOk: function onOk(callback) { onOkCallback = callback; },
        setAvatarImageIdx: function setAvatarImageIdx(avatarImageIdx) { selectedAvatarImageIdx = avatarImageIdx; },
        getAvatarImageIdx: function getAvatarImageIdx() { return viewData.imageSelection.getSelection(); },
        setName: function setName(name) { selectedName = name; },
        getName: function getName() { return viewData.getName(); }
      };
    }
  };
}());
