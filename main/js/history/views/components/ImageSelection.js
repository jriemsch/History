net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  var Scroll = net.riemschneider.gestures.Scroll;
  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.history.views.components.ImageSelection = {
    create: function (parent, options) {
      var selectedImg = null;
      var selectedIdx = null;
      var images = [];
      var lastScrollPos = 0;

      var spacing = getCssImageWidth() * 1.5;
      var containerDiv = createContainer();
      Scroll.create(containerDiv, onScrolledBy);
      addOptionsToDiv();

      function selectImage(idx, scrollTo) {
        if (selectedImg) {
          selectedImg.removeClass('imageSelectionSelector');
        }
        selectedImg = images[idx];
        selectedIdx = idx;
        selectedImg.addClass('imageSelectionSelector');

        if (scrollTo) {
          setScrollPosition((window.innerWidth - spacing) / 2 - idx * spacing, 0);
        }
      }

      function getCssImageWidth() {
        var dummyDiv = $('<div class="imageSelectionOptionImage"></div>');
        parent.append(dummyDiv);
        var width = dummyDiv.width();
        dummyDiv.remove();
        return width;
      }

      function createContainer() {
        var containerDiv = $('<div class="imageSelectionOptionContainer"></div>');
        var midScreen = (window.innerWidth - spacing) / 2;
        containerDiv.css({
          marginLeft: midScreen,
          width: options.length * spacing + midScreen
        });
        parent.append(containerDiv);
        lastScrollPos = midScreen;
        return containerDiv;
      }

      function onScrolledBy(offset, easeTime) {
        var newPos = lastScrollPos + offset.x;
        var max = (window.innerWidth - spacing) / 2;
        var min = max - spacing * (options.length - 1);
        setScrollPosition(Math.min(max, Math.max(min, newPos)), easeTime);
      }

      function setScrollPosition(marginLeft, easeTime) {
        containerDiv.css({
          webkitTransition: easeTime > 0 ? 'margin-left ' + easeTime + 'ms ease-out' : '',
          marginLeft: marginLeft
        });
        lastScrollPos = marginLeft;
      }

      function addOptionsToDiv() {
        for (var idx in options) {
          addOptionToDiv(options[idx], idx);
        }
      }

      function addOptionToDiv(option, idx) {
        var optionDiv = $('<div class="imageSelectionOption"></div>');
        optionDiv.css({
          left: idx * spacing + 'px',
          width: spacing
        });
        containerDiv.append(optionDiv);

        var img = $('<img src=' + option.imgSrc + ' class="imageSelectionOptionImage"></img>');
        optionDiv.hide();
        optionDiv.append(img);

        img.load(function () {
           optionDiv.show();
        });

        images[idx] = img;

        Tap.create(optionDiv, function () { selectImage(idx, false); }, true);
      }

      return {
        getSelection: function getSelection() { return selectedIdx; },
        setSelection: function setSelection(idx) {
          selectImage(idx, true);
        }
      };
    }
  };
}());
