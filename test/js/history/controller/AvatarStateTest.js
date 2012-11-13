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
      avatarImageIdx: null,
      name: null,
      show: function () {},
      hide: function () {},
      onOk: function (callback) { this.callback = callback; },
      getAvatarImageIdx: function () { return this.avatarImageIdx; },
      setAvatarImageIdx: function (idx) { this.avatarImageIdx = idx; },
      getName: function () { return this.name; },
      setName: function (name) { this.name = name; }
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
    var player = this.playerController.getPlayer();
    player.setAvatarImageIdx(2);
    player.setName('original');
    AvatarState.create(this.stateMachine, this.avatarSelection, this.playerController);
    this.stateMachine.start();
    this.stateMachine.transitionTo('avatar');

    assertEquals(2, this.avatarSelection.avatarImageIdx);
    assertEquals('original', this.avatarSelection.name);

    this.avatarSelection.avatarImageIdx = 1;
    this.avatarSelection.name = 'changed';

    this.avatarSelection.callback();

    assertEquals(1, player.getAvatarImageIdx());
    assertEquals('changed', player.getName());
    assertEquals('menu', this.stateMachine.getCurrentStateId());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { AvatarState.create(this.stateMachine, this.avatarSelection, null); }, 'TypeError');

    assertException(function () { AvatarState.create(this.stateMachine, this.avatarSelection, {}); }, 'TypeError');
  }
});