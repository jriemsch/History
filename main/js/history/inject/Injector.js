net.riemschneider.history.inject = net.riemschneider.history.inject || {};

// Simple dependency injector mechanism to wire up the entire app.
(function () {
  net.riemschneider.history.inject.Injector = {
    create: function () {
      var injector = {};

      injector.addOns = net.riemschneider.history.model.AddOns.create();

      injector.opponents = [];
      injector.baseOpponentsReader = net.riemschneider.history.data.BaseOpponentsReader.create(injector.opponents);
      injector.baseOpponentsReader.read('json/baseOpponents.json');

      injector.topicsById = {};
      injector.questionsByTopicAndFact = {};
      injector.regionsByTopic = {};
      injector.topicDataReader = net.riemschneider.history.data.TopicDataReader.create(injector.topicsById, injector.questionsByTopicAndFact, injector.addOns, injector.regionsByTopic);
      injector.topicDataReader.read('json/frenchRevolution.json');
      injector.topicDataReader.read('json/americanRevolution.json');
      injector.topicDataReader.read('json/firstWorldWar.json');
      injector.topicDataReader.read('json/secondWorldWar.json');
      injector.topicDataReader.read('json/worldHistory.json');

      injector.questionDistribution = net.riemschneider.history.model.QuestionDistribution.create([
          [0.7, 0.2, 0.1], [0.5, 0.3, 0.2], [0.33, 0.34, 0.33]
      ]);

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

      return injector;
    }
  };
}());
