net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  var AvatarImages = net.riemschneider.history.data.AvatarImages;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.history.views.components.QuizPlayers = {
    create: function (parent, players) {
      ArgumentUtils.assertNotNull(parent);
      ArgumentUtils.assertArray(players, function (elem) {
        ArgumentUtils.assertTypeOneOf(elem, [ net.riemschneider.history.model.Player, net.riemschneider.history.model.Opponent ]);
      });
      ArgumentUtils.assertRange(players.length, 3, 3);

      var containerDiv = createContainerDiv();
      var quizPlayerInfos = addPlayersToContainer();
      var selectedPlayer = null;

      selectPlayer(0);
      for (var playerIdx = 0; playerIdx < 3; ++playerIdx) { setScore(playerIdx, 0 ); }

      function addPlayersToContainer() {
        var quizPlayerInfos = [];
        for (var idx = 0, len = players.length; idx < len; ++idx) {
          var player = players[idx];
          var avatarImageIdx = player.getAvatarImageIdx();
          var avatarImageSrc = AvatarImages.getImage(avatarImageIdx);
          var quizPlayer = $('<div class="quizPlayer"></div>');
          var quizAvatar = $('<img class="quizAvatar" src=' + avatarImageSrc + '>');
          var quizPlayerScore = $('<div class="quizPlayerScore"></div>');

          quizPlayer.addClass('player' + idx);

          quizPlayer.append(quizAvatar);
          quizPlayer.append(quizPlayerScore);
          containerDiv.append(quizPlayer);

          quizPlayerInfos[idx] = { quizPlayer: quizPlayer, quizPlayerScore: quizPlayerScore };
        }

        return quizPlayerInfos;
      }

      function setScore(playerIdx, score) {
        ArgumentUtils.assertRange(playerIdx, 0, 3);
        ArgumentUtils.assertRange(score, 0, 999);

        var zeros = '00';
        var asStr = score.toString();
        var len = asStr.length;
        var withZeros = len < 3 ? zeros.substr(0, 3 - len) + asStr : asStr;
        var player = players[playerIdx];
        quizPlayerInfos[playerIdx].quizPlayerScore.html(withZeros + '<br>' + player.getName());
      }

      function selectPlayer(playerIdx) {
        if (playerIdx !== null) {
          ArgumentUtils.assertRange(playerIdx, 0, 3);
        }

        if (selectedPlayer !== null) {
          quizPlayerInfos[selectedPlayer].quizPlayer.removeClass('selected');
        }
        selectedPlayer = playerIdx;
        if (selectedPlayer !== null) {
          quizPlayerInfos[selectedPlayer].quizPlayer.addClass('selected');
        }
      }

      function createContainerDiv() {
        var container = $('<div class="quizPlayers"><div class="quizPlayerHeightAdjuster"></div></div>');
        parent.append(container);
        return container;
      }

      return {
        destroy: function destroy() { containerDiv.remove(); },
        selectPlayer: selectPlayer,
        getSelectedPlayer: function getSelectedPlayer() { return selectedPlayer; },
        setScore: setScore
      };
    }
  };
}());
