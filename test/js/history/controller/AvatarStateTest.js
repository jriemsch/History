var AvatarState = net.riemschneider.history.controller.AvatarState;
var PlayerController = net.riemschneider.history.controller.PlayerController;
var ViewState = net.riemschneider.structures.ViewState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('AvatarStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'menu', true);
    this.avatarSelection = {
      callback: null,
      show: function () {},
      hide: function () {},
      onOk: function (callback) { this.callback = callback; },
      getAvatarImageIdx: function () { return 1; },
      getName: function () { return 'name'; }
    };
    this.playerController = PlayerController.create();
  },

  testCreate: function () {
    var state = AvatarState.create(this.stateMachine, this.avatarSelection, this.playerController);
    assertTrue(TypeUtils.isOfType(state, AvatarState));
    assertTrue(TypeUtils.isOfType(state, ViewState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testOnConfigureView: function () {
    AvatarState.create(this.stateMachine, this.avatarSelection, this.playerController);
    this.stateMachine.start();
    this.stateMachine.transitionTo('avatar');
    this.avatarSelection.callback();
    var player = PlayerController.create().getPlayer();
    assertEquals(1, player.getAvatarImageIdx());
    assertEquals('name', player.getName());
    assertEquals('menu', this.stateMachine.getCurrentStateId());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { AvatarState.create(this.stateMachine, this.avatarSelection, null); }, 'TypeError');

    assertException(function () { AvatarState.create(this.stateMachine, this.avatarSelection, {}); }, 'TypeError');
  }
});