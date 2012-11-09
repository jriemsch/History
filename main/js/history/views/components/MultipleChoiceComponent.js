net.riemschneider.history.views = net.riemschneider.history.views || {};
net.riemschneider.history.views.components = net.riemschneider.history.views.components || {};

(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.history.views.components.MultipleChoiceComponent = {
    create: function create(registry) {
	  ArgumentUtils.assertNotNull(registry);
	  
	  var component = {
	    isCompatible: function isCompatible(answer) {
		  ArgumentUtils.assertType(answer, net.riemschneider.history.model.Answer);
		  return TypeUtils.isOfType(answer, net.riemschneider.history.model.MultipleChoice);
		},
		
	    createAnswerComponent: function createAnswerComponent(answer) {
		  ArgumentUtils.assertType(answer, net.riemschneider.history.model.Answer);
		  return {
		    show: function show(parent) {
			  var choices = answer.getChoices();
			  var divs = [];
			  var container = $('<div class="multipleChoiceContainer"></div>');
			  for (var idx = 0, len = choices.length; idx < len; ++idx) {
			    var choice = choices[idx];
				var choiceDiv = $('<div class="multipleChoiceChoice">' + choice + '</div>');
				choiceDiv.css({ top: (100 * idx / len) + "%" });
				container.append(choiceDiv);
				divs.push(choiceDiv);
			  }
			  parent.append(container);
			  return divs; 
			},
			getAnswer: function getAnswer() { return answer; }
		  };
		}
	  };
	  
	  registry.registerAnswerComponentType(component);
	  
	  return component;
	}
  };
}());
