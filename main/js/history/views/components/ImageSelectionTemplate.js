net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var Template = net.riemschneider.ui.Template;
  var Scroll = net.riemschneider.gestures.Scroll;
  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.history.views.components.ImageSelectionTemplate = {
    create: function (templateId, processorRegistry) {
      var template = Template.create(templateId, processorRegistry);

      template.onCloned = function onCloned(containerDiv, data) {
        var selectedOptionDiv = null;
        var selectedIdx = null;
        var optionDivs = [];
        var lastScrollPos = 0;
        var spacing = getSpacingFromCss();

        createContainerDiv();
        addOptionsToDiv();

        setScrollPosition(0, 0);

        containerDiv.getSelection = function getSelection() { return selectedIdx; };
        containerDiv.setSelection = function setSelection(idx) { selectImage(idx, true); };

        function getSpacingFromCss() {
          var firstOption = data.options[0];
          var optionDiv = firstOption.template.clone(firstOption);
          $('body').append(optionDiv);
          var width = optionDiv.width();
          optionDiv.remove();
          return width;
        }

        function selectImage(idx, scrollTo) {
          if (selectedOptionDiv) {
            selectedOptionDiv.removeClass('imageSelectionSelector');
          }
          selectedOptionDiv = optionDivs[idx];
          selectedIdx = idx;
          selectedOptionDiv.addClass('imageSelectionSelector');

          if (scrollTo) {
            setScrollPosition((window.innerWidth - spacing) / 2 - idx * spacing, 0);
          }
        }

        function onScrolledBy(offset, easeTime) {
          var newPos = lastScrollPos + offset.x;
          setScrollPosition(newPos, easeTime);
        }

        function setScrollPosition(newPos, easeTime) {
          var min = window.innerWidth - spacing * data.options.length;
          var pos = Math.min(0, Math.max(min, newPos));
          containerDiv.css({
            webkitTransition: easeTime > 0 ? 'margin-left ' + easeTime + 'ms ease-out' : '',
            marginLeft: pos
          });
          lastScrollPos = pos;
        }

        function createContainerDiv() {
          var midScreen = (window.innerWidth - spacing) / 2;
          containerDiv.css({
            marginLeft: midScreen,
            width: data.options.length * spacing + midScreen
          });
          Scroll.create(containerDiv, onScrolledBy);
          lastScrollPos = midScreen;
        }

        function addOptionsToDiv() {
          for (var idx = 0, len = data.options.length; idx < len; ++idx) {
            addOptionToDiv(data.options[idx], idx);
          }
        }

        function addOptionToDiv(option, idx) {
          var optionDiv = option.template.clone(option);
          optionDiv.css({ left: idx * spacing + 'px' });

          containerDiv.append(optionDiv);

          optionDivs[idx] = optionDiv;

          Tap.create(optionDiv, function () {
            selectImage(idx, false);
            if (option.callback) {
              option.callback();
            }
          }, true);
        }
      };

      return template;
    }
  };

  TypeUtils.enhance('net.riemschneider.history.views.components.ImageSelectionTemplate', net.riemschneider.history.views.components.ImageSelectionTemplate);
}());
