net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  var Topic = net.riemschneider.history.model.Topic;
  var Difficulty = net.riemschneider.history.model.Difficulty;
  var Question = net.riemschneider.history.model.Question;
  var MultipleChoice = net.riemschneider.history.model.MultipleChoice;

  net.riemschneider.history.data.FrenchRevolution = {
    init: function init(topics, questionsByTopicAndFact) {
      var topicId = 'FRENCH_REVOLUTION';
      topics.push(Topic.create(topicId, 'Französische Revolution', 'images/frenchRevolution.png'));

      questionsByTopicAndFact[topicId] = {};

      addFact(0, [
          Question.create(id(0, 0), Difficulty.EASY, 'Wo traten am 5. Mai 1789 die Generalstände zusammen?',
              MultipleChoice.create(0, ['Leipzig', 'Florenz', 'Versailles'], 2)),
          Question.create(id(0, 1), Difficulty.MEDIUM, 'Wo traten am 5. Mai 1789 die Generalstände zusammen?',
              MultipleChoice.create(0, ['Paris', 'Versailles', 'Varennes'], 1)),
          Question.create(id(0, 2), Difficulty.MEDIUM, 'Wann traten die Generalstände in Versailles zusammen?',
              MultipleChoice.create(0, ['15. April 1757', '20. November 1780', '5. Mai 1789', '15. Februar 1798', '4. Juli 1872'], 2)),
          Question.create(id(0, 3), Difficulty.MEDIUM, 'Wer trat am 5. Mai 1789 in Versailles zusammen?',
              MultipleChoice.create(0, ['Die Nationalversammlung', 'Das Parlament', 'Die Generalstände'], 2))
      ]);

      function addFact(factNo, questions) {
        questionsByTopicAndFact[topicId]['FACT' + factNo] = questions;
      }

      function id(factNo, questionNo) {
        return topicId + '_FACT' + factNo + '_QUESTION' + questionNo;
      }
    }
  };
}());
