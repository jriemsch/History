var AvatarSelection = net.riemschneider.history.views.AvatarSelection;
var PlayerController = net.riemschneider.history.controller.PlayerController;
var JQueryTestUtils = net.riemschneider.testutils.JQueryTestUtils;

TestCase('AvatarSelectionTest', {
  setUp: function () {
    $('body').empty();

    this.avatarSelectionDiv = $('<div id="avatarSelection"></div>');
    this.avatarsDiv = $('<div id="avatars"></div>');
    this.questionMarksTop = $('<div id="avatarQuestionMarksTop"></div>');
    this.questionMarksBottom = '<div id="avatarQuestionMarksBottom"></div>';
    this.nameInputDiv = $('<div id="nameInput"></div>');
    this.nameInputDivDiv = $('<div></div>');
    this.nameInput = $('<input type="text">');
    this.buttonBarDiv = $('<div class="footer"></div>');
    this.okButton = $('<div class="okButton"></div>');

    $('body').append(this.avatarSelectionDiv);
    this.avatarSelectionDiv.append(this.avatarsDiv);
    this.avatarSelectionDiv.append(this.questionMarksTop);
    this.avatarSelectionDiv.append(this.questionMarksBottom);
    this.avatarSelectionDiv.append(this.nameInputDiv);
    this.avatarSelectionDiv.append(this.buttonBarDiv);
    this.nameInputDiv.append(this.nameInputDivDiv);
    this.nameInputDivDiv.append(this.nameInput);
    this.buttonBarDiv.append(this.okButton);

    this.avatarSelectionDiv.hide();

    this.playerController = PlayerController.create();
  },

  tearDown: function () {
    $('body').empty();
  },

  testShowAndHide: function () {
    var sel = AvatarSelection.create(this.playerController);
    assertEquals('none', this.avatarSelectionDiv.css('display'));
    sel.show();
    assertEquals('block', this.avatarSelectionDiv.css('display'));
    sel.hide();
    assertEquals('none', this.avatarSelectionDiv.css('display'));
  },

  testPreviousNameIsShown: function () {
    var player = this.playerController.getPlayer();
    player.setName('initial');
    AvatarSelection.create(this.playerController).show();
    assertEquals('initial', this.nameInput.val());
  },

  testSelectName: function () {
    var sel = AvatarSelection.create(this.playerController);
    sel.show();
    this.nameInput.val('changed');
    assertEquals('changed', sel.getName());
  },

  testAllImagesShown: function () {
    AvatarSelection.create(this.playerController).show();
    var allImages = $('.imageSelectionOptionImage');
    assertEquals(31, allImages.length);
  },

  testPreviousImageIsSelected: function () {
    var player = this.playerController.getPlayer();
    player.setAvatarImageIdx(2);
    AvatarSelection.create(this.playerController).show();
    var selectedImage = $('.imageSelectionSelector');
    assertEquals(1, selectedImage.length);
    assertEquals('images/avatars/avatar002.png', selectedImage.attr('src'));
  },

  testSelectImage: function () {
    var sel = AvatarSelection.create(this.playerController);
    sel.show();
    var allImages = $('.imageSelectionOptionImage');
    $(allImages[1]).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    $(allImages[1]).trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertEquals(1, sel.getAvatarImageIdx());
  },

  testOkCallsCallback: function () {
    var sel = AvatarSelection.create(this.playerController);
    var called = false;
    sel.onOk(function () { called = true; });
    sel.show();
    this.okButton.trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    this.okButton.trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertTrue(called);
  },

  testNameInputFocusIsLostWhenPressingReturn: function () {
    AvatarSelection.create(this.playerController).show();
    var blurRecorder = JQueryTestUtils.startRecording('blur');
    this.nameInput.trigger(jQuery.Event('keydown', { which: 13 }));
    JQueryTestUtils.stopRecording(blurRecorder);
    var lastRecording = JQueryTestUtils.getLastRecording(blurRecorder, function () { return true; });
    assertEquals(this.nameInput[0], lastRecording.obj[0]);
    JQueryTestUtils.clearRecording(blurRecorder);
  },


  testNameInputFocusIsLostWhenClickingSomewhere: function () {
    AvatarSelection.create(this.playerController).show();
    var blurRecorder = JQueryTestUtils.startRecording('blur');
    $(document).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    JQueryTestUtils.stopRecording(blurRecorder);
    var lastRecording = JQueryTestUtils.getLastRecording(blurRecorder, function () { return true; });
    assertEquals(this.nameInput[0], lastRecording.obj[0]);
    JQueryTestUtils.clearRecording(blurRecorder);
  }
});
