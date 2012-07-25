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
      injector.menu = net.riemschneider.history.views.Menu.create(injector.avatarSelection, null, null, null);

      return injector;
    }
  };
}());
