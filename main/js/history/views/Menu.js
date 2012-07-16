net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;
  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.history.views.Menu = {
    create: function (avatarSelection, quiz, learn, stats) {
      var options = [
        { imgSrc: 'images/avatarselection.png', text: 'Avatar', pos: { x: 80, y: 22 }, view: avatarSelection },
        { imgSrc: 'images/quiz.png', text: 'Quiz', pos: { x: 30, y: 37 }, view: quiz },
        { imgSrc: 'images/learn.png', text: 'Lernen', pos: { x: 70, y: 63 }, view: learn },
        { imgSrc: 'images/stats.png', text: 'Statistik', pos: { x: 20, y: 78 }, view: stats }
      ];

      var menuBackground = $('#menuBackground');
      var menuOptions = $('#menuOptions');

      createMenuOptions();

      function show() {
        $('#menu').show();
        AnimatedBackground.create(menuBackground, 6, 'images/questionMark.png');
      }

      function createMenuOptionTap(tappable, option) {
        Tap.create(tappable, function () {
          $('#menu').hide();
          menuBackground.empty();
          option.view.show(show);
        }, false, 'menuOptionSelected');
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
        for (var idx in options) {
          createMenuOption(options[idx]);
        }
      }

      return {
        show: show
      };
    }
  }
}());
