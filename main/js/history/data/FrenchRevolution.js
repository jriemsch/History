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
          Question.create(id(0, 0), Difficulty.EASY, 'Wann begann die Französische Revolution?',
              TimeChoice.createYearChoice(0, 1780, 1810, 1789)),
          Question.create(id(0, 1), Difficulty.MEDIUM, 'Wann begann die Französische Revolution?',
              TimeChoice.createDayChoice(0, new Date(1780, 0, 1), new Date(1810, 11, 31), new Date(1789, 5, 17)))
      ]);

      addFact(1, [
          Question.create(id(1, 0), Difficulty.EASY, 'Wo traten am 5. Mai 1789 die Generalstände zusammen?',
              MultipleChoice.create(0, [
                'Leipzig', 
                'Florenz', 
                'Versailles'
              ], [2])),
          Question.create(id(1, 1), Difficulty.MEDIUM, 'Wo traten am 5. Mai 1789 die Generalstände zusammen?',
              MultipleChoice.create(0, [
                'Paris', 
                'Versailles', 
                'Varennes'
              ], [1])),
          Question.create(id(1, 2), Difficulty.MEDIUM, 'Wann traten die Generalstände in Versailles zusammen?',
              MultipleChoice.create(0, [
                '15. April 1757', 
                '20. November 1780', 
                '5. Mai 1789', 
                '15. Februar 1798', 
                '4. Juli 1872'
              ], [2])),
          Question.create(id(1, 3), Difficulty.MEDIUM, 'Wer trat am 5. Mai 1789 in Versailles zusammen?',
              MultipleChoice.create(0, [
                'Die Nationalversammlung', 
                'Das Parlament', 
                'Die Generalstände'
              ], [2])),
          Question.create(id(1, 4), Difficulty.MEDIUM, 'Warum berief König Ludwig XVI. am 5. Mai 1789 die Generalstände zusammen?',
              MultipleChoice.create(0, [
                'Um den finanziellen Bankrott des Staates abzuwenden', 
                'Um eine neue Verfassung durchzusetzen', 
                'Um einen Krieg gegen Österreich zu beginnen'
              ], [0])),
          Question.create(id(1, 5), Difficulty.MEDIUM, 'Wer war Teil der Generalstände?',
              MultipleChoice.create(0, [
                'Der Adel',
                'Der Klerus',
                'Der Dritte Stand',
                'Die Jakobiner',
                'Die Sansculotten',
                'Der König'
              ], [0, 1, 2]))
      ]);
      
      addFact(2, [
          Question.create(id(2, 0), Difficulty.MEDIUM, 'Wer erklärt sich am 17. Juni 1789 zur Nationalversammlung?',
              MultipleChoice.create(0, [
                'Der Dritte Stand',
                'Der Adel',
                'Der Nationalkonvent'
              ], 0)),
          Question.create(id(2, 1), Difficulty.HARD, 'Wieso erklären sich die Vertreter des Dritten Standes am 17. Juni 1789 zur Nationalversammlung?',
              MultipleChoice.create(0, [
                'Weil sie mehr als 96% der Nation vertraten',
                'Weil sie den König abschaffen wollten',
                'Weil sie ihre Unabhängigkeit durchsetzen wollten'
              ], 0))
      ]);
      
      addFact(3, [
          Question.create(id(3, 0), Difficulty.MEDIUM, 'Was schwören die Abgeordneten des Dritten Standes beim sogenannten „Ballhausschwur“?',
              MultipleChoice.create(0, [
                'dass sie Frankreich eine Verfassung geben',
                'dass sie den König stürzen',
                'dass sie den Adel enteignen werden'
              ], 0)),
          Question.create(id(3, 1), Difficulty.EASY, 'Was findet am 20. Juni 1789 in einem provisorischen Sitzungssaal statt?',
              MultipleChoice.create(0, [
                'Der Ballhausschwur',
                'Die Erklärung der Menschen- und Bürgerrechte',
                'Die Ausrufung der ersten Republik'
              ], 0))
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
