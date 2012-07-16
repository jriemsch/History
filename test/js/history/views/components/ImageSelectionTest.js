var ImageSelection = net.riemschneider.history.views.components.ImageSelection;

TestCase('ImageSelectionTest', {
  setUp: function () {
    $('body').empty();
    var css = $('<style type="text/css">' +
        '.imageSelectionOptionImage { width: 100px; } ' +
        '.imageSelectionOption { position: absolute; } ' +
        '.imageSelectionOptionContainer { position: absolute; }' +
        '</style>');
    $('head').append(css);
    this.width = Math.floor((window.innerWidth - 150) / 2);
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreateImagePlacement: function () {
    ImageSelection.create($('body'), [{ imgSrc: '/test/images/test.png' }, { imgSrc: '/test/images/test.png' }]);
    var container = $('body').find('.imageSelectionOptionContainer');
    assertEquals(1, container.length);
    var optionDivs = container.find('.imageSelectionOption');
    assertEquals(2, optionDivs.length);
    assertEquals('0px', $(optionDivs[0]).css('left'));
    assertEquals('150px', $(optionDivs[1]).css('left'));
  },

  testDefaultSelection: function () {
    var sel = ImageSelection.create($('body'), [{ imgSrc: '/test/images/test.png' }, { imgSrc: '/test/images/test.png' }]);
    assertNull(sel.getSelection());
  },

  testSetSelection: function () {
    var sel = ImageSelection.create($('body'), [{ imgSrc: '/test/images/test.png' }, { imgSrc: '/test/images/test.png' }]);
    sel.setSelection(1);
    assertEquals(1, sel.getSelection());
    var images = $('body').find('.imageSelectionOptionContainer .imageSelectionOptionImage');
    assertFalse($(images[0]).hasClass('imageSelectionSelector'));
    assertTrue($(images[1]).hasClass('imageSelectionSelector'));
  },

  testTapSelectsImage: function () {
    var sel = ImageSelection.create($('body'), [{ imgSrc: '/test/images/test.png' }, { imgSrc: '/test/images/test.png' }]);
    sel.setSelection(0);
    var images = $('body').find('.imageSelectionOptionContainer .imageSelectionOptionImage');
    assertEquals(2, images.length);
    $(images[1]).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    $(images[1]).trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertEquals(1, sel.getSelection());
    assertFalse($(images[0]).hasClass('imageSelectionSelector'));
    assertTrue($(images[1]).hasClass('imageSelectionSelector'));
  },

  testScrolling: function () {
    ImageSelection.create($('body'), [{ imgSrc: '/test/images/test.png' }, { imgSrc: '/test/images/test.png' }]);
    var container = $('body').find('.imageSelectionOptionContainer');
    container.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 0 }));
    container.trigger(jQuery.Event('mousemove', { pageX: 100, pageY: 0 }));
    assertEquals((this.width - 20) + 'px', container.css('margin-left'));
  },

  testMaxScroll: function () {
    ImageSelection.create($('body'), [{ imgSrc: '/test/images/test.png' }, { imgSrc: '/test/images/test.png' }]);
    var container = $('body').find('.imageSelectionOptionContainer');
    container.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 0 }));
    container.trigger(jQuery.Event('mousemove', { pageX: 121, pageY: 0 }));
    assertEquals(this.width + 'px', container.css('margin-left'));
  },

  testMinScroll: function () {
    ImageSelection.create($('body'), [{ imgSrc: '/test/images/test.png' }, { imgSrc: '/test/images/test.png' }]);
    var container = $('body').find('.imageSelectionOptionContainer');
    container.trigger(jQuery.Event('mousedown', { pageX: 200, pageY: 0 }));
    container.trigger(jQuery.Event('mousemove', { pageX: 0, pageY: 0 }));
    assertEquals((this.width - 150) + 'px', container.css('margin-left'));
  }
});
