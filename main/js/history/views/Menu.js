net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;
  var Tap = net.riemschneider.gestures.Tap;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.views.Menu = {
    Option: TypeUtils.enhanceEnum('net.riemschneider.history.model.Menu.Option', {
      AVATAR: { key: 'AVATAR' },
      QUIZ: { key: 'QUIZ' },
      LEARN: { key: 'LEARN' },
      STATS: { key: 'STATS' }
    }),

    create: function () {
      var Option = net.riemschneider.history.views.Menu.Option;

      var options = {};
      options[Option.AVATAR.key] = { imgSrc: 'images/avatarselection.png', text: 'Avatar', pos: { x: 80, y: 22 }, onSelect: null };
      options[Option.QUIZ.key] = { imgSrc: 'images/quiz.png', text: 'Quiz', pos: { x: 30, y: 37 }, onSelect: null };
      options[Option.LEARN.key] = { imgSrc: 'images/learn.png', text: 'Lernen', pos: { x: 70, y: 63 }, onSelect: null };
      options[Option.STATS.key] = { imgSrc: 'images/stats.png', text: 'Statistik', pos: { x: 20, y: 78 }, onSelect: null };

      var menuBackground = $('#menuBackground');
      var menuOptions = $('#menuOptions');

      createMenuOptions();

      function show() {
        $('#menu').show();
        AnimatedBackground.create(menuBackground, 6, 'images/questionMark.png');
      }

      function hide() {
        $('#menu').hide();
        menuBackground.empty();
      }

      function onSelect(option, callback) {
        ArgumentUtils.assertType(option, Option);
        options[option.key].onSelect = callback;
      }

      function createMenuOptionTap(tappable, option) {
        Tap.create(tappable, function () { option.onSelect() }, false, 'menuOptionSelected');
      }

      function createMenuOption(option) {
        var optionDiv = $('<div class="menuOption"></div>');
        optionDiv.css({
          left: option.pos.x + '%',
          top: option.pos.y + '%'
        });
        var img = $('<img class="menuOptionImage" src="' + option.imgSrc + '">');
        var label = $('<div class="menuOptionText">' + option.text + '</div>');
        optionDiv.append(img);
        optionDiv.append(label);
        menuOptions.append(optionDiv);
        createMenuOptionTap(img, option);
        return optionDiv;
      }

      function createMenuOptions() {
        for (var key in options) {
          if (options.hasOwnProperty(key)) {
            createMenuOption(options[key]);
          }
        }
      }

      return {
        show: show,
        hide: hide,
        onSelect: onSelect
      };
    }
  }
}());