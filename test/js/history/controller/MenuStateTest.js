var MenuState = net.riemschneider.history.controller.MenuState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;
var Menu = net.riemschneider.history.views.Menu;

TestCase('MenuStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'avatar', false);
    State.create(this.stateMachine, 'quizTopic', false);
    State.create(this.stateMachine, 'learn', false);
    State.create(this.stateMachine, 'stats', false);
    this.presenter = {
      onQuiz: null,
      onAvatar: null,
      onLearn: null,
      onStats: null,
      show: function show(onAvatar, onQuiz, onLearn, onStats) { this.onAvatar = onAvatar; this.onQuiz = onQuiz; this.onLearn = onLearn; this.onStats = onStats; },
      hide: function hide() { this.onAvatar = null; this.onQuiz = null; this.onLearn = null; this.onStats = null; }
    };
  },

  testCreate: function () {
    var state = MenuState.create(this.stateMachine, this.presenter);
    assertTrue(TypeUtils.isOfType(state, MenuState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { MenuState.create(this.stateMachine, null); }, 'TypeError');
  },

  testIsStartState: function () {
    MenuState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    assertEquals('menu', this.stateMachine.getCurrentStateId());
  },

  testOnEnter: function () {
    MenuState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('menu');

    assertNotNull(this.presenter.onQuiz);
  },

  testOnAvatarCallback: function () {
    MenuState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('menu');

    this.presenter.onAvatar();

    assertEquals('avatar', this.stateMachine.getCurrentStateId());
  },

  testOnQuizCallback: function () {
    MenuState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('menu');

    this.presenter.onQuiz();

    assertEquals('quizTopic', this.stateMachine.getCurrentStateId());
  },

  testOnLearnCallback: function () {
    MenuState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('menu');

    this.presenter.onLearn();

    assertEquals('learn', this.stateMachine.getCurrentStateId());
  },

  testOnStatsCallback: function () {
    MenuState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('menu');

    this.presenter.onStats();

    assertEquals('stats', this.stateMachine.getCurrentStateId());
  },

  testOnLeave: function () {
    MenuState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('menu');

    this.stateMachine.transitionTo('avatar');
    assertNull(this.presenter.onAvatar);
  }
});
