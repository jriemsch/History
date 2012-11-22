net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ImageSelection = net.riemschneider.history.views.components.ImageSelection;
  var AnimatedBackground = net.riemschneider.history.views.components.AnimatedBackground;
  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.history.views.OpponentSelection = {
    create: function create(opponentTemplate, backgroundTemplate) {
      ArgumentUtils.assertType(opponentTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(backgroundTemplate, net.riemschneider.ui.Template);

      var questionMarksDivTop = $('#opponentQuestionMarksTop');
      var questionMarksDivBottom = $('#opponentQuestionMarksBottom');
      var opponentsDiv = $('#opponents');

      prepareButtonBar();

      var onBackCallback = null;
      var imageSelection = null;
      var opponentInfos = [];

      function createImageSelection() {
        var options = createOpponentOptions();
        imageSelection = ImageSelection.create(opponentsDiv, options);
      }

      function destroyImageSelection() {
        imageSelection.destroy();
        imageSelection = null;
      }

      function prepareButtonBar() {
        var backButton = $('#opponentSelection').find('.footer .backButton');
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
        var options = [];
        for (var idx = 0, len = opponentInfos.length; idx < len; ++idx) {
          var opponentInfo = opponentInfos[idx];
          options[idx] = createOpponentOption(opponentInfo);
        }

        return options;
      }

      function createOpponentOption(opponentInfo) {
        return {
          div: opponentTemplate.clone(opponentInfo),
          callback: function () { opponentInfo.callback(); }
        };
      }

      return {
        show: function show() {
          createImageSelection();
          $('#opponentSelection').show();
          AnimatedBackground.create(questionMarksDivTop, 3, backgroundTemplate);
          AnimatedBackground.create(questionMarksDivBottom, 3, backgroundTemplate);
          prepareOnResize();
        },
        hide: function hide() {
          destroyImageSelection();
          questionMarksDivTop.empty();
          questionMarksDivBottom.empty();
          $('#opponentSelection').hide();
        },
        onBack: function onBack(callback) { onBackCallback = callback; },
        setOpponentInfos: function setOpponentInfos(newOpponentInfos) {
          ArgumentUtils.assertArray(newOpponentInfos, function (elem) {
            ArgumentUtils.assertString(elem.background);
            ArgumentUtils.assertFunction(elem.callback);
          });
          opponentInfos = newOpponentInfos;
        }
      };
    }
  };
}());
