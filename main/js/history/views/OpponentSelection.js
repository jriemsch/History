net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.history.views.OpponentSelection = {
    create: function create(templates) {
      ArgumentUtils.assertType(templates.imageSelectionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.opponentTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.backgroundTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.backgroundImageTemplate, net.riemschneider.ui.Template);

      var questionMarksDivTop = $('#opponentQuestionMarksTop');
      var questionMarksDivBottom = $('#opponentQuestionMarksBottom');
      var opponentsDiv = $('#opponents');

      prepareButtonBar();

      var onBackCallback = null;
      var imageSelectionDiv = null;
      var opponentInfos = [];

      function createImageSelection() {
        for (var idx = 0, len = opponentInfos.length; idx < len; ++idx) {
          opponentInfos[idx].template = templates.opponentTemplate;
        }
        imageSelectionDiv = templates.imageSelectionTemplate.clone({ options: opponentInfos });
        opponentsDiv.append(imageSelectionDiv);
      }

      function destroyImageSelection() {
        imageSelectionDiv.remove();
        imageSelectionDiv = null;
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

      return {
        show: function show() {
          createImageSelection();
          $('#opponentSelection').show();
          var backgroundData = { count: 3, imageTemplate: templates.backgroundImageTemplate };
          questionMarksDivTop.append(templates.backgroundTemplate.clone(backgroundData));
          questionMarksDivBottom.append(templates.backgroundTemplate.clone(backgroundData));
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
