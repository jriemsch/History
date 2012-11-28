net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var AvatarImages = net.riemschneider.history.data.AvatarImages;
  var Difficulty = net.riemschneider.history.model.Difficulty;

  var backgroundClasses = {};
  backgroundClasses[Difficulty.EASY.key] = 'imageSelectionBackgroundGlowGreen';
  backgroundClasses[Difficulty.MEDIUM.key] = 'imageSelectionBackgroundGlowYellow';
  backgroundClasses[Difficulty.HARD.key] = 'imageSelectionBackgroundGlowRed';

  net.riemschneider.history.controller.QuizOpponentPresenter = {
    create: function create(opponentController, quizGenerator, quizController, templates) {
      ArgumentUtils.assertNotNull(opponentController);
      ArgumentUtils.assertNotNull(quizGenerator);
      ArgumentUtils.assertNotNull(quizController);
      ArgumentUtils.assertMap(templates);
      ArgumentUtils.assertType(templates.opponentSelectionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.imageSelectionTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.opponentTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.backgroundImageTemplate, net.riemschneider.ui.Template);
      ArgumentUtils.assertType(templates.backgroundTemplate, net.riemschneider.ui.Template);

      var opponentSelectionDiv = null;

      return {
        show: function show(onBack, onDone) {
          ArgumentUtils.assertFunction(onBack);
          ArgumentUtils.assertFunction(onDone);

          var viewData = {
            imageSelection: {
              template: templates.imageSelectionTemplate,
              options: createOpponentInfos()
            },
            background: {
              template: templates.backgroundTemplate,
              imageTemplate: templates.backgroundImageTemplate,
              count: 3
            },
            onBackCallback: function () { onBack(); }
          };

          opponentSelectionDiv = templates.opponentSelectionTemplate.clone(viewData);
          $('body').append(opponentSelectionDiv);

          function createOpponentInfos() {
            var pairings = opponentController.getRandomOpponentPairings(2);
            return convertPairings(pairings);
          }

          function convertPairings(pairings) {
            var infos = [];
            for (var idx = 0, len = Difficulty.values.length; idx < len; ++idx) {
              var difficulty = Difficulty.values[idx];
              var pairingsOfDifficulty = pairings[difficulty.key];
              if (pairingsOfDifficulty) {
                convertPairingsOfDifficulty(infos, pairingsOfDifficulty, difficulty);
              }
            }
            return infos;
          }

          function convertPairingsOfDifficulty(infos, pairingsOfDifficulty, difficulty) {
            for (var idx = 0, len = pairingsOfDifficulty.length; idx < len; ++idx) {
              infos.push(convertPairing(pairingsOfDifficulty[idx], difficulty));
            }
          }

          function convertPairing(pairing, difficulty) {
            return {
              template: templates.opponentTemplate,
              background: backgroundClasses[difficulty.key],
              image0: AvatarImages.getImage(pairing.first.getAvatarImageIdx()),
              name0: pairing.first.getName(),
              image1: AvatarImages.getImage(pairing.second.getAvatarImageIdx()),
              name1: pairing.second.getName(),
              callback: function onPairingSelected() {
                quizGenerator.setCurrentOpponents(pairing);
                quizGenerator.setCurrentDifficulty(difficulty);
                var quiz = quizGenerator.generate();
                quizController.setCurrentQuiz(quiz);
                onDone();
              }
            };
          }
        },

        hide: function hide() {
          opponentSelectionDiv.remove();
        }
      };
    }
  };
}());
