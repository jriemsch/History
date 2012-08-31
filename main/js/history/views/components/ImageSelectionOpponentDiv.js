net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ClosureUtils = net.riemschneider.utils.ClosureUtils;
  var AvatarImages = net.riemschneider.history.data.AvatarImages;
  var Difficulty = net.riemschneider.history.model.Difficulty;

  var difficultyClasses = {};
  difficultyClasses[Difficulty.EASY.key] = 'imageSelectionOpponentEasy';
  difficultyClasses[Difficulty.MEDIUM.key] = 'imageSelectionOpponentMedium';
  difficultyClasses[Difficulty.HARD.key] = 'imageSelectionOpponentHard';

  net.riemschneider.history.views.components.ImageSelectionOpponentDiv = {
    create: function create(opponentPairing, difficulty) {
      ArgumentUtils.assertType(opponentPairing.first, net.riemschneider.history.model.Opponent);
      ArgumentUtils.assertType(opponentPairing.second, net.riemschneider.history.model.Opponent);
      ArgumentUtils.assertType(difficulty, Difficulty);

      var difficultyClass = difficultyClasses[difficulty.key];
      var optionDiv = $('<div class="imageSelectionOption ' + difficultyClass + '"></div>');

      var countDown = ClosureUtils.createCountDown(2, function () { optionDiv.show(); });

      var opponentDiv1 = $('<div class="imageSelectionOpponent"></div>');
      var opponentDiv2 = $('<div class="imageSelectionOpponent"></div>');

      appendOpponent(opponentDiv1, opponentPairing.first);
      appendOpponent(opponentDiv2, opponentPairing.second);

      function appendOpponent(opponentDiv, opponent) {
        var avatarImage = AvatarImages.getImage(opponent.getAvatarImageIdx());
        var img = $('<img class="imageSelectionOptionImage" src=' + avatarImage + '></img>');
        optionDiv.hide();
        optionDiv.append(opponentDiv);
        opponentDiv.append(img);

        opponentDiv.append($('<div class="imageSelectionOptionText"><p>' + opponent.getName() + '</p></div>'));

        img.load(countDown);
      }

      return optionDiv;
    }
  };
}());
