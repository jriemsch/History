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

      setScrollPosition(0, 0);

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
        setScrollPosition(newPos, easeTime);
      }

      function setScrollPosition(newPos, easeTime) {
        var min = window.innerWidth - spacing * options.length;
        var pos = Math.min(0, Math.max(min, newPos));
        containerDiv.css({
          webkitTransition: easeTime > 0 ? 'margin-left ' + easeTime + 'ms ease-out' : '',
          marginLeft: pos
        });
        lastScrollPos = pos;
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

        var img = $('<img class="imageSelectionOptionImage" src=' + option.imgSrc + '></img>');
        optionDiv.hide();
        optionDiv.append(img);
        if (option.name) {
          optionDiv.append($('<div class="imageSelectionOptionText"><p>' + option.name + '</p></div>'));
        }

        if (option.overlay) {
          optionDiv.append($('<img class="imageSelectionOptionOverlay" src=' + option.overlay + '></img>'));
        }

        if (option.imgOpacity) {
          img.css('opacity', option.imgOpacity);
        }

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
