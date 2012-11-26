net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var AvatarImages = net.riemschneider.history.data.AvatarImages;

  net.riemschneider.history.controller.AvatarPresenter = {
    create: function create(playerController, templates) {
      ArgumentUtils.assertType(playerController, net.riemschneider.history.controller.PlayerController);
      ArgumentUtils.assertMap(templates);
      ArgumentUtils.assertType(templates.avatarSelectionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.imageSelectionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.avatarImageSelectionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.backgroundImageTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.backgroundTemplate, net.riemschneider.ui.Template);

      var avatarSelectionDiv = null;

      return {
        show: function show(onDone) {
          ArgumentUtils.assertFunction(onDone);

          var player = playerController.getPlayer();

          var options = [];
          for (var idx = 0; idx < AvatarImages.getImageCount(); ++idx) {
            options[idx] = {
              template: templates.avatarImageSelectionTemplate,
              image: AvatarImages.getImage(idx)
            };
          }

          var viewData = {
            imageSelection: {
              template: templates.imageSelectionTemplate,
              selectedImageIdx: player.getAvatarImageIdx(),
              options: options
            },
            background: {
              template: templates.backgroundTemplate,
              imageTemplate: templates.backgroundImageTemplate,
              count: 3
            },
            selectedName: player.getName(),
            onOkCallback: onOk
          };

          avatarSelectionDiv = templates.avatarSelectionTemplate.clone(viewData);
          $('body').append(avatarSelectionDiv);

          function onOk() {
            var player = playerController.getPlayer();
            player.setAvatarImageIdx(viewData.imageSelection.getSelection());
            player.setName(viewData.getName() || 'Mr. X');
            playerController.savePlayer();
            onDone();
          }
        },

        hide: function hide() {
          avatarSelectionDiv.remove();
        }
      };
    }
  };
}());
