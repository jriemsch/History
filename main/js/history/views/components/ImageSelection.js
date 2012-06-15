net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  var TouchUtils = net.riemschneider.utils.TouchUtils;

  net.riemschneider.history.views.components.ImageSelection = {
    create: function (parent, options) {
      var selectedImg = null;
      var selectedIdx = null;
      var images = [];

      var spacing = getCssImageWidth() * 1.5;

      var containerDiv = $('<div class="imageSelectionOptionContainer"></div>');
      appendContainer();

      addDraggingToDiv();
      addOptionsToDiv();

      return {
        getSelection: function getSelection() { return selectedIdx; },
        setSelection: function setSelection(idx) {
          selectImage(idx, true);
        }
      };

      function selectImage(idx, scrollTo) {
        if (selectedImg) {
          selectedImg.removeClass('imageSelectionSelector');
        }
        selectedImg = images[idx];
        selectedIdx = idx;
        selectedImg.addClass('imageSelectionSelector');

        if (scrollTo) {
          setScroll((window.innerWidth - spacing) / 2 - idx * spacing, true, 300);
        }
      }

      function getCssImageWidth() {
        var dummyDiv = $('<div class="imageSelectionOptionImage"></div>');
        parent.append(dummyDiv);
        var width = dummyDiv.width();
        dummyDiv.remove();
        return width;
      }

      function appendContainer() {
        var midScreen = (window.innerWidth - spacing) / 2;
        containerDiv.css({
          marginLeft: midScreen,
          width: options.length * spacing + midScreen
        });
        parent.append(containerDiv);
      }

      function addDraggingToDiv() {
        TouchUtils.onTouchStart(containerDiv, function (startEvent) {
          setScroll(containerDiv.offset().left);

          startEvent.preventDefault();
          startEvent.stopPropagation();

          var startTouchPos = TouchUtils.getTouchPosOfEvent(startEvent);
          var lastTouchPos = startTouchPos;
          var velocity = 0;

          var touchMoveRemover = TouchUtils.onTouchMove(containerDiv, function (moveEvent) {
            moveEvent.preventDefault();
            moveEvent.stopPropagation();

            var curTouchPos = TouchUtils.getTouchPosOfEvent(moveEvent);
            var oldMarginLeft = containerDiv.offset().left;
            var diff = curTouchPos.x - lastTouchPos.x;
            velocity = diff;
            setScroll(diff + oldMarginLeft, false);
            lastTouchPos = curTouchPos;
          });

          var touchEndRemover = TouchUtils.onTouchEnd(containerDiv, function (endEvent) {
            endEvent.preventDefault();
            endEvent.stopPropagation();

            var endTouchPos = TouchUtils.getTouchPosOfEvent(event);
            if (Math.abs(endTouchPos.x - startTouchPos.x) > 8 || Math.abs(endTouchPos.y - startTouchPos.y) > 8) {
              var oldMarginLeft = containerDiv.offset().left;
              setScroll(oldMarginLeft + velocity * 10, true, Math.abs(velocity * 10));
            }

            touchEndRemover();
            touchMoveRemover();
          });
        });
      }

      function setScroll(newMarginLeft, eased, time) {
        var midScreen = (window.innerWidth - spacing) / 2;
        containerDiv.css({
          webkitTransition: eased ? 'margin-left ' + time + 'ms ease-out' : '',
          marginLeft: Math.min(midScreen, Math.max(midScreen - spacing * (options.length - 1), newMarginLeft))
        });
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

        TouchUtils.onTap(optionDiv, function () { selectImage(idx, false); }, true);
      }
    }
  };
}());
