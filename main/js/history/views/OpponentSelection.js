net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  var ImageSelection = net.riemschneider.history.views.components.ImageSelection;
  var ImageSelectionOpponentDiv = net.riemschneider.history.views.components.ImageSelectionOpponentDiv;
  var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;
  var Difficulty = net.riemschneider.history.model.Difficulty;
  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.history.views.OpponentSelection = {
    create: function create(opponentController) {
      var questionMarksDivTop = $('#opponentQuestionMarksTop');
      var questionMarksDivBottom = $('#opponentQuestionMarksBottom');
      var opponentsDiv = $('#opponents');

      createImageSelection();

      prepareButtonBar();

      var onOkCallback = null;
      var onBackCallback = null;

      function createImageSelection() {
        var options = createOpponentOptions();
        ImageSelection.create(opponentsDiv, options);
      }

      function prepareButtonBar() {
        var okButton = $('#opponentSelection .footer .okButton');
        Tap.create(okButton, function() { onOkCallback(); }, false, 'okPressed');

        var backButton = $('#opponentSelection .footer .backButton');
        Tap.create(backButton, function() { onBackCallback(); }, false, 'backPressed');
      }

      function prepareOnResize() {
        $(window).resize(function () {
          var height = window.innerHeight - opponentsDiv.offset().top - opponentsDiv.outerHeight() - 7;
          questionMarksDivTop.css({ top: 0, height: opponentsDiv.offset().top });
          questionMarksDivBottom.css({ bottom: 0, height: height });
        });

        setTimeout(function () { $(window).resize(); }, 0);
      }

      function createOpponentOptions() {
        var opponentPairings = opponentController.getRandomOpponentPairings(2);
        var options = [];
        for (var idx = 0, len = Difficulty.values.length; idx < len; ++idx) {
          var difficulty = Difficulty.values[idx];
          var pairings = opponentPairings[difficulty.key];
          if (pairings) {
            createOpponentOptionsForPairings(pairings, difficulty);
          }
        }

        function createOpponentOptionsForPairings(pairings, difficulty) {
          for (var idx = 0, len = pairings.length; idx < len; ++idx) {
            var pairing = pairings[idx];
            var optionDiv = ImageSelectionOpponentDiv.create(pairing, difficulty);
            options.push({ div: optionDiv });
          }
        }
        return options;
      }

      return {
        show: function show() {
          $('#opponentSelection').show();
          AnimatedBackground.create(questionMarksDivTop, 3, 'images/questionMark.png');
          AnimatedBackground.create(questionMarksDivBottom, 3, 'images/questionMark.png');
          prepareOnResize();
        },
        hide: function hide() {
          questionMarksDivTop.empty();
          questionMarksDivBottom.empty();
          $('#opponentSelection').hide();
        },
        onOk: function onOk(callback) { onOkCallback = callback; },
        onBack: function onBack(callback) { onBackCallback = callback; }
      };
    }
  };
}());
