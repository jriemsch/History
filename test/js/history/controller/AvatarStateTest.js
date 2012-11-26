var AvatarState = net.riemschneider.history.controller.AvatarState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('AvatarStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'menu', true);
    this.presenter = {
      onDone: null,
      show: function show(onDone) { this.onDone = onDone; },
      hide: function hide() { this.onDone = null; }
    };
  },

  testCreate: function () {
    var state = AvatarState.create(this.stateMachine, this.presenter);
    assertTrue(TypeUtils.isOfType(state, AvatarState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { AvatarState.create(this.stateMachine, null); }, 'TypeError');
  },

  testOnEnter: function () {
    AvatarState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('avatar');

    assertNotNull(this.presenter.onDone);
  },

  testOnDoneCallback: function () {
    AvatarState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('avatar');

    this.presenter.onDone();

    assertEquals('menu', this.stateMachine.getCurrentStateId());
  },

  testOnLeave: function () {
    AvatarState.create(this.stateMachine, this.presenter);
    this.stateMachine.start();
    this.stateMachine.transitionTo('avatar');

    this.stateMachine.transitionTo('menu');
    assertNull(this.presenter.onDone);
  }
});