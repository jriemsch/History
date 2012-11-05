net.riemschneider.history.inject = net.riemschneider.history.inject || {};

// Simple dependency injector mechanism to wire up the entire app.
(function () {
  "use strict";

  var ClosureUtils = net.riemschneider.utils.ClosureUtils;

  net.riemschneider.history.inject.Injector = {
    create: function (onInjectorCreated) {
      var injector = {};
      var countDown = ClosureUtils.createCountDown(7, onDataRead);

      injector.addOns = net.riemschneider.history.model.AddOns.create();

      injector.opponents = [];
      var baseOpponentsReader = net.riemschneider.history.data.BaseOpponentsReader.create();
      baseOpponentsReader.read('json/baseOpponents.json', addOpponent, countDown);

      injector.topicsById = {};
      injector.questionsByTopicAndFact = {};
      injector.regionsByTopic = {};
      var topicDataReader = net.riemschneider.history.data.TopicDataReader.create();
      topicDataReader.read('json/frenchRevolution.json', addTopic, countDown);
      topicDataReader.read('json/americanRevolution.json', addTopic, countDown);
      topicDataReader.read('json/firstWorldWar.json', addTopic, countDown);
      topicDataReader.read('json/secondWorldWar.json', addTopic, countDown);
      topicDataReader.read('json/worldHistory.json', addTopic, countDown);

      var questionDistributionReader = net.riemschneider.history.data.QuestionDistributionReader.create();
      questionDistributionReader.read('json/questionDistribution.json', setDistribution, countDown);

      function addTopic(topic, regions, facts, unlocked) {
        var topicId = topic.getId();
        injector.topicsById[topicId] = topic;
        injector.regionsByTopic[topicId] = regions;
        injector.questionsByTopicAndFact[topicId] = facts;

        if (unlocked) {
          injector.addOns.unlock(topicId);
        }
      }
      function addOpponent(opponent) { injector.opponents.push(opponent); }
      function setDistribution(distribution) { injector.questionDistribution = distribution; }

      function onDataRead() {
        injector.opponentController = net.riemschneider.history.controller.OpponentController.create(injector.opponents);
        injector.playerController = net.riemschneider.history.controller.PlayerController.create();
        injector.questionListGenerator = net.riemschneider.history.controller.QuestionListGenerator.create(injector.questionsByTopicAndFact);
        injector.quizGenerator = net.riemschneider.history.controller.QuizGenerator.create(injector.regionsByTopic, injector.questionListGenerator, injector.questionDistribution);
        injector.quizController = net.riemschneider.history.controller.QuizController.create();

        injector.avatarSelection = net.riemschneider.history.views.AvatarSelection.create(injector.playerController);
        injector.topicSelection = net.riemschneider.history.views.TopicSelection.create(injector.topicsById, injector.addOns);
        injector.opponentSelection = net.riemschneider.history.views.OpponentSelection.create();
        injector.menu = net.riemschneider.history.views.Menu.create();
        injector.quizView = net.riemschneider.history.views.QuizView.create(injector.playerController, injector.quizController, injector.regionsByTopic, injector.topicsById);

        injector.stateMachine = net.riemschneider.structures.StateMachine.create();
        injector.menuState = net.riemschneider.history.controller.MenuState.create(injector.stateMachine, injector.menu);
        injector.avatarState = net.riemschneider.history.controller.AvatarState.create(injector.stateMachine, injector.avatarSelection, injector.playerController);
        injector.quizTopicState = net.riemschneider.history.controller.QuizTopicState.create(injector.stateMachine, injector.topicSelection, injector.quizGenerator);
        injector.quizOpponentState = net.riemschneider.history.controller.QuizOpponentState.create(injector.stateMachine, injector.opponentSelection, injector.opponentController, injector.quizGenerator, injector.quizController);
        injector.quizState = net.riemschneider.history.controller.QuizState.create(injector.stateMachine, injector.quizView, injector.quizController);

        onInjectorCreated(injector);
      }
    }
  };
}());
