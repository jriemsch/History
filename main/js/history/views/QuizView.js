net.riemschneider.history.views = net.riemschneider.history.views || {};

(function () {
  var AvatarImages = net.riemschneider.history.data.AvatarImages;
  var ImageMap = net.riemschneider.history.views.components.ImageMap;

  net.riemschneider.history.views.QuizView = {
    create: function (playerController, quizController, regionsByTopic, topicsById) {
      return {
        show: function show() {
          var quizView = $('#quizView');
          var quizMap = quizView.find('.quizMap');
          var quizMapTopo = quizMap.find('.quizMapTopo');
          var quizPlayers = quizView.find('.quizPlayers');
          var quiz = quizController.getCurrentQuiz();
          var opponents = quiz.getOpponentPairing();
          var player = playerController.getPlayer();
          var players = [ player, opponents.first, opponents.second ];
          var topicId = quiz.getTopicId();
          var topic = topicsById[topicId];
          fillQuizPlayers();
          addRegions();
          quizMapTopo.css({ backgroundImage: 'url("' + topic.getMapImage() + '")'});
          quizView.show();

          function addRegions() {
            var imageMap = ImageMap.create(quizMapTopo);
            var regions = regionsByTopic[topicId].getRegions();
            for (var idx = 0, len = regions.length; idx < len; ++idx) {
              var region = regions[idx];
              var imgSrc = region.getImgSrc();
              var imgPos = region.getImgPos();
              var imgSize = region.getImgSize();
              var mapElement = imageMap.addImage(imgSrc, imgPos, imgSize, function onTapped() {
              });
              mapElement.addImageClass('quizRegion');
              mapElement.addMaskClass('quizMaskRegion');
              mapElement.addMaskClass('quizRegionUnclaimed');

              var difficultyMarker = $('<div class="quizDifficultyMarker"></div>');
              var difficultyPos = region.getDifficultyPos();
              difficultyMarker.css({
                left: imgPos.getX() + difficultyPos.getX() + imgPos.getUnit().css,
                top: imgPos.getY() + difficultyPos.getY() + imgPos.getUnit().css
              });
              if (idx % 3 == 0) {
                difficultyMarker.addClass('quizDifficultyHard');
                difficultyMarker.append('20');
              } else if (idx % 3 == 1) {
                difficultyMarker.addClass('quizDifficultyMedium');
                difficultyMarker.append('10');
              } else {
                difficultyMarker.addClass('quizDifficultyEasy');
                difficultyMarker.append('5');
              }

              quizMapTopo.append(difficultyMarker);
            }
          }

          function fillQuizPlayers() {
            var addedQuizPlayers = [];
            for (var idx = 0, len = players.length; idx < len; ++idx) {
              var player = players[idx];
              var avatarImageIdx = player.getAvatarImageIdx();
              var avatarImageSrc = AvatarImages.getImage(avatarImageIdx);
              var quizPlayer = $('<div class="quizPlayer"></div>');
              var quizAvatar = $('<img class="quizAvatar" src=' + avatarImageSrc + '>');
              var quizPlayerScore = $('<div class="quizPlayerScore">000<br>' + player.getName() + '</div>');

              if (idx === 0) {
                quizPlayer.addClass('selected');
              }
              quizPlayer.addClass('player' + idx);

              quizPlayer.append(quizAvatar);
              quizPlayer.append(quizPlayerScore);
              quizPlayers.append(quizPlayer);

              addedQuizPlayers[idx] = quizPlayer;
            }

            var selected = 0;
            setInterval(function () {
              addedQuizPlayers[(selected + 1) % 3].addClass('selected');
              addedQuizPlayers[selected % 3].removeClass('selected');
              ++selected;
            }, 5000);
          }
        },
        hide: function hide() {
          $('#quizView').hide();
        }
      };
    }
  };
}());
