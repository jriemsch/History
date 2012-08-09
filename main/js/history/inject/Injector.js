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
      net.riemschneider.history.data.FrenchRevolution.init(injector.topics, injector.questionsByTopicAndFact, injector.addOns);
      net.riemschneider.history.data.AmericanRevolution.init(injector.topics, injector.questionsByTopicAndFact, injector.addOns);
      net.riemschneider.history.data.FirstWorldWar.init(injector.topics, injector.questionsByTopicAndFact, injector.addOns);
      net.riemschneider.history.data.SecondWorldWar.init(injector.topics, injector.questionsByTopicAndFact, injector.addOns);
      net.riemschneider.history.data.WorldHistory.init(injector.topics, injector.questionsByTopicAndFact, injector.addOns);

      injector.opponentController = net.riemschneider.history.controller.OpponentController.create(injector.opponents);
      injector.playerController = net.riemschneider.history.controller.PlayerController.create();

      injector.avatarSelection = net.riemschneider.history.views.AvatarSelection.create(injector.playerController);
      injector.topicSelection = net.riemschneider.history.views.TopicSelection.create(injector.topics, injector.addOns);
      injector.menu = net.riemschneider.history.views.Menu.create();

      injector.stateMachine = net.riemschneider.structures.StateMachine.create();
      injector.menuState = net.riemschneider.history.controller.MenuState.create(injector.stateMachine, injector.menu);
      injector.avatarState = net.riemschneider.history.controller.AvatarState.create(injector.stateMachine, injector.avatarSelection, injector.playerController);
      injector.quizState = net.riemschneider.history.controller.QuizState.create(injector.stateMachine, injector.topicSelection);

      return injector;
    }
  };
}());
