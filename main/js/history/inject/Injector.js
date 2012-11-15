net.riemschneider.history.inject = net.riemschneider.history.inject || {};

// Simple dependency injector mechanism to wire up the entire app.
(function () {
  "use strict";

  var ClosureUtils = net.riemschneider.utils.ClosureUtils;

  net.riemschneider.history.inject.Injector = {
    create: function (onInjectorCreated) {
      var inj = {};
      var countDown = ClosureUtils.createCountDown(7, onDataRead);

      inj.addOns = net.riemschneider.history.model.AddOns.create();

      inj.opponents = [];
      var baseOpponentsReader = net.riemschneider.history.data.BaseOpponentsReader.create();
      baseOpponentsReader.read('json/baseOpponents.json', addOpponent, countDown);

      inj.topicsById = {};
      inj.questionsByTopicAndFact = {};
      inj.regionsByTopic = {};
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
        inj.topicsById[topicId] = topic;
        inj.regionsByTopic[topicId] = regions;
        inj.questionsByTopicAndFact[topicId] = facts;

        if (unlocked) {
          inj.addOns.unlock(topicId);
        }
      }
      function addOpponent(opponent) { inj.opponents.push(opponent); }
      function setDistribution(distribution) { inj.questionDistribution = distribution; }

      function onDataRead() {
        inj.opponentController = net.riemschneider.history.controller.OpponentController.create(inj.opponents);
        inj.playerController = net.riemschneider.history.controller.PlayerController.create();
        inj.questionListGenerator = net.riemschneider.history.controller.QuestionListGenerator.create(inj.questionsByTopicAndFact);
        inj.quizGenerator = net.riemschneider.history.controller.QuizGenerator.create(inj.regionsByTopic, inj.questionListGenerator, inj.questionDistribution);
        inj.quizController = net.riemschneider.history.controller.QuizController.create();

        inj.avatarSelection = net.riemschneider.history.views.AvatarSelection.create();
        inj.topicSelection = net.riemschneider.history.views.TopicSelection.create();
        inj.opponentSelection = net.riemschneider.history.views.OpponentSelection.create();
        inj.menu = net.riemschneider.history.views.Menu.create();
        inj.answerComponentRegistry = net.riemschneider.history.views.components.AnswerComponentRegistry.create();
        inj.multipleChoiceComponent = net.riemschneider.history.views.components.MultipleChoiceComponent.create(inj.answerComponentRegistry);
        inj.quizView = net.riemschneider.history.views.QuizView.create(inj.playerController, inj.quizController, inj.regionsByTopic, inj.topicsById, inj.answerComponentRegistry);

        inj.stateMachine = net.riemschneider.structures.StateMachine.create();
        inj.menuState = net.riemschneider.history.controller.MenuState.create(inj.stateMachine, inj.menu);
        inj.avatarState = net.riemschneider.history.controller.AvatarState.create(inj.stateMachine, inj.avatarSelection, inj.playerController);
        inj.quizTopicState = net.riemschneider.history.controller.QuizTopicState.create(inj.stateMachine, inj.topicSelection, inj.quizGenerator, inj.topicsById, inj.addOns);
        inj.quizOpponentState = net.riemschneider.history.controller.QuizOpponentState.create(inj.stateMachine, inj.opponentSelection, inj.opponentController, inj.quizGenerator, inj.quizController);
        inj.quizState = net.riemschneider.history.controller.QuizState.create(inj.stateMachine, inj.quizView);
        inj.quizPlayerSelectsRegionState = net.riemschneider.history.controller.QuizPlayerSelectsRegionState.create(inj.stateMachine, inj.quizController, inj.quizView);
        inj.quizQuestionState = net.riemschneider.history.controller.QuizQuestionState.create(inj.stateMachine, inj.quizController, inj.quizView);

        onInjectorCreated(inj);
      }
    }
  };
}());
