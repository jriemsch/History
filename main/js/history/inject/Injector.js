net.riemschneider.history.inject = net.riemschneider.history.inject || {};

// Simple dependency injector mechanism to wire up the entire app.
(function () {
  net.riemschneider.history.inject.Injector = {
    create: function () {
      var injector = {};

      injector.addOns = net.riemschneider.history.model.AddOns.create();

      injector.opponents = [];
      net.riemschneider.history.data.BaseOpponents.init(injector.opponents);

      injector.topics = [];
      injector.questionsByTopicAndFact = {};
      injector.regionsByTopic = {};
      net.riemschneider.history.data.FrenchRevolution.init(injector.topics, injector.questionsByTopicAndFact, injector.addOns, injector.regionsByTopic);
      net.riemschneider.history.data.AmericanRevolution.init(injector.topics, injector.questionsByTopicAndFact, injector.addOns, injector.regionsByTopic);
      net.riemschneider.history.data.FirstWorldWar.init(injector.topics, injector.questionsByTopicAndFact, injector.addOns, injector.regionsByTopic);
      net.riemschneider.history.data.SecondWorldWar.init(injector.topics, injector.questionsByTopicAndFact, injector.addOns, injector.regionsByTopic);
      net.riemschneider.history.data.WorldHistory.init(injector.topics, injector.questionsByTopicAndFact, injector.addOns, injector.regionsByTopic);

      injector.questionDistribution = net.riemschneider.history.model.QuestionDistribution.create([
          [0.7, 0.2, 0.1], [0.5, 0.3, 0.2], [0.33, 0.34, 0.33]
      ]);

      injector.opponentController = net.riemschneider.history.controller.OpponentController.create(injector.opponents);
      injector.playerController = net.riemschneider.history.controller.PlayerController.create();
      injector.questionListGenerator = net.riemschneider.history.controller.QuestionListGenerator.create(injector.questionsByTopicAndFact);
      injector.quizGenerator = net.riemschneider.history.controller.QuizGenerator.create(injector.regionsByTopic, injector.questionListGenerator, injector.questionDistribution);
      injector.quizController = net.riemschneider.history.controller.QuizController.create();

      injector.avatarSelection = net.riemschneider.history.views.AvatarSelection.create(injector.playerController);
      injector.topicSelection = net.riemschneider.history.views.TopicSelection.create(injector.topics, injector.addOns);
      injector.opponentSelection = net.riemschneider.history.views.OpponentSelection.create();
      injector.menu = net.riemschneider.history.views.Menu.create();
      injector.quizView = net.riemschneider.history.views.QuizView.create(injector.quizController);

      injector.stateMachine = net.riemschneider.structures.StateMachine.create();
      injector.menuState = net.riemschneider.history.controller.MenuState.create(injector.stateMachine, injector.menu);
      injector.avatarState = net.riemschneider.history.controller.AvatarState.create(injector.stateMachine, injector.avatarSelection, injector.playerController);
      injector.quizTopicState = net.riemschneider.history.controller.QuizTopicState.create(injector.stateMachine, injector.topicSelection, injector.quizGenerator);
      injector.quizOpponentState = net.riemschneider.history.controller.QuizOpponentState.create(injector.stateMachine, injector.opponentSelection, injector.opponentController, injector.quizGenerator, injector.quizController);
      injector.quizState = net.riemschneider.history.controller.QuizState.create(injector.stateMachine, injector.quizView, injector.quizController);

      return injector;
    }
  };
}());
