net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.controller.MenuPresenter = {
    create: function create(templates) {
      ArgumentUtils.assertMap(templates);
      ArgumentUtils.assertType(templates.menuTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.menuOptionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.backgroundImageTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.backgroundTemplate, net.riemschneider.ui.Template);

      var menuDiv = null;

      return {
        show: function show(onAvatar, onQuiz, onLearn, onStats) {
          ArgumentUtils.assertFunction(onAvatar);
          ArgumentUtils.assertFunction(onQuiz);
          ArgumentUtils.assertFunction(onLearn);
          ArgumentUtils.assertFunction(onStats);

          var viewData = {
            options: [
              {
                image: 'images/avatarselection.png',
                text: 'Avatar',
                style: { left: '80%', top: '22%' },
                onSelect: function () { onAvatar(); },
                template: templates.menuOptionTemplate
              },
              {
                image: 'images/quiz.png',
                text: 'Quiz',
                style: { left: '30%', top: '37%' },
                onSelect: function () { onQuiz(); },
                template: templates.menuOptionTemplate
              },
              {
                image: 'images/learn.png',
                text: 'Lernen',
                style: { left: '70%', top: '63%' },
                onSelect: function () { onLearn(); },
                template: templates.menuOptionTemplate
              },
              {
                image: 'images/stats.png',
                text: 'Statistik',
                style: { left: '20%', top: '78%' },
                onSelect: function () { onStats(); },
                template: templates.menuOptionTemplate
              }
            ],
            background: {
              template: templates.backgroundTemplate,
              imageTemplate: templates.backgroundImageTemplate,
              count: 6
            }
          };

          menuDiv = templates.menuTemplate.clone(viewData);
          $('body').append(menuDiv);
        },

        hide: function hide() {
          menuDiv.remove();
        }
      };
    }
  };
}());
