net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ViewState = net.riemschneider.structures.ViewState;
  var Difficulty = net.riemschneider.history.model.Difficulty;

  var backgroundClasses = {};
  backgroundClasses[Difficulty.EASY.key] = 'imageSelectionBackgroundGlowGreen';
  backgroundClasses[Difficulty.MEDIUM.key] = 'imageSelectionBackgroundGlowYellow';
  backgroundClasses[Difficulty.HARD.key] = 'imageSelectionBackgroundGlowRed';

  net.riemschneider.history.controller.QuizOpponentState = {
    create: function create(stateMachine, opponentSelection, opponentController, quizGenerator, quizController) {
      ArgumentUtils.assertNotNull(opponentController);
      ArgumentUtils.assertNotNull(quizGenerator);
      ArgumentUtils.assertNotNull(quizController);

      var state = ViewState.create(stateMachine, 'quizOpponent', false, opponentSelection);

      state.onConfigureView = function onConfigureView() {
        var pairings = opponentController.getRandomOpponentPairings(2);
        var opponentInfos = convertPairings(pairings);
        opponentSelection.setOpponentInfos(opponentInfos);
        opponentSelection.onBack(function () { stateMachine.transitionTo('quizTopic'); });
      };

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
          backgroundClass: backgroundClasses[difficulty.key],
          imageInfos: [
            { avatarImageIdx: pairing.first.getAvatarImageIdx(), name: pairing.first.getName() },
            { avatarImageIdx: pairing.second.getAvatarImageIdx(), name: pairing.second.getName() }
          ],
          callback: function onPairingSelected() {
            quizGenerator.setCurrentOpponents(pairing);
            quizGenerator.setCurrentDifficulty(difficulty);
            var quiz = quizGenerator.generate();
            quizController.setCurrentQuiz(quiz);
            stateMachine.transitionTo('quiz');
          }
        };
      }

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.controller.QuizOpponentState', net.riemschneider.history.controller.QuizOpponentState);
}());