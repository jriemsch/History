net.riemschneider.history.data = net.riemschneider.history.data || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var Topic = net.riemschneider.history.model.Topic;
  var Difficulty = net.riemschneider.history.model.Difficulty;
  var Question = net.riemschneider.history.model.Question;
  var MultipleChoice = net.riemschneider.history.model.MultipleChoice;
  var OrderChoice = net.riemschneider.history.model.OrderChoice;
  var TimeChoice = net.riemschneider.history.model.TimeChoice;
  var GapChoice = net.riemschneider.history.model.GapChoice;
  var Gap = net.riemschneider.history.model.Gap;
  var ValueChoice = net.riemschneider.history.model.ValueChoice;
  var DateSelector = net.riemschneider.history.model.DateSelector;
  var AddOns = net.riemschneider.history.model.AddOns;

  net.riemschneider.history.data.FrenchRevolution = {
    init: function init(topics, questionsByTopicAndFact, addOns) {
      ArgumentUtils.assertArray(topics);
      ArgumentUtils.assertMap(questionsByTopicAndFact);
      ArgumentUtils.assertType(addOns, AddOns);

      var topicId = 'FRENCH_REVOLUTION';
      topics.push(Topic.create(topicId, 'Französische Revolution', 'images/frenchRevolution.png'));

      addOns.unlock(topicId);

      questionsByTopicAndFact[topicId] = {};
    
      addFact(0, [
          Question.create(id(0, 0), Difficulty.EASY, 'Wann begann die Französische Revolution?',
              TimeChoice.create(0, DateSelector.year(1780), DateSelector.year(1810), DateSelector.year(1789))),
          Question.create(id(0, 1), Difficulty.MEDIUM, 'Wann begann die Französische Revolution?',
              TimeChoice.create(0, DateSelector.day(1, 1, 1780), DateSelector.day(31, 12, 1810), DateSelector.day(17, 6, 1789)))
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
              ], [0, 1, 2])),
          Question.create(id(1, 6), Difficulty.EASY, 'Wer berief im Mai 1789 die Generalstände zusammen?',
              MultipleChoice.create(0, [
                'König Ludwig XVI.',
                'König Ludwig XIV.',
                'Kaiser Leopold II.',
                'König Friedrich Wilhelm II.',
                'Papst Pius VI.'
              ], [0]))
      ]);
      
      addFact(2, [
          Question.create(id(2, 0), Difficulty.MEDIUM, 'Wer erklärt sich am 17. Juni 1789 zur Nationalversammlung?',
              MultipleChoice.create(0, [
                'Der Dritte Stand',
                'Der Adel',
                'Der Nationalkonvent'
              ], [0])),
          Question.create(id(2, 1), Difficulty.HARD, 'Wieso erklären sich die Vertreter des Dritten Standes am 17. Juni 1789 zur Nationalversammlung?',
              MultipleChoice.create(0, [
                'Weil sie mehr als 96% der Nation vertraten',
                'Weil sie den König abschaffen wollten',
                'Weil sie ihre Unabhängigkeit durchsetzen wollten'
              ], [0]))
      ]);
      
      addFact(3, [
          Question.create(id(3, 0), Difficulty.MEDIUM, 'Was schwören die Abgeordneten des Dritten Standes beim sogenannten „Ballhausschwur“?',
              MultipleChoice.create(0, [
                'Dass sie Frankreich eine Verfassung geben',
                'Dass sie den König stürzen',
                'Dass sie den Adel enteignen werden'
              ], [0])),
          Question.create(id(3, 1), Difficulty.EASY, 'Was findet am 20. Juni 1789 in einem provisorischen Sitzungssaal statt?',
              MultipleChoice.create(0, [
                'Der Ballhausschwur',
                'Die Erklärung der Menschen- und Bürgerrechte',
                'Die Ausrufung der ersten Republik'
              ], [0]))
      ]);

      addFact(4, [
          Question.create(id(4, 0), Difficulty.MEDIUM, 'Bringe die folgenden Ereignisse in die richtige Reihenfolge:',
              OrderChoice.create(0, [
                'Der Ballhausschwur',
                'Der Beitritt von Adel und Klerus zur Nationalversammlung',
                'Die Nationalversammlung wird zur Verfassungsgebenden Versammlung',
                'Die Erklärung der Menschen- und Bürgerrechte'
              ], [0, 1, 2, 3]))
      ]);
    
      addFact(5, [
          Question.create(id(5, 0), Difficulty.MEDIUM, 'Was wird als Konstituante bezeichnet?',
              MultipleChoice.create(0, [
                'Die verfassungsgebende Nationalversammlung',
                'Die Erklärung der Menschen- und Bürgerrechte',
                'Die französische Verfassung von 1791'
              ], [0]))
      ]);
      
      addFact(6, [
          Question.create(id(6, 0), Difficulty.MEDIUM, 'Wer war Finanzminister zu Beginn der Französischen Revolution?',
              MultipleChoice.create(0, [
                'Jacques Necker',
                'Louis Auguste Le Tonnelier de Breteuil',
                'Étienne Clavière'
              ], [0])),
          Question.create(id(6, 1), Difficulty.MEDIUM, 'Warum wurde Jacques Necker am 11. Juli 1789 als Finanzminister abgesetzt?',
              MultipleChoice.create(0, [
                'Weil er vom König als Auslöser der Revolution betrachtet wurde',
                'Weil er die Staatsfinanzen nicht in den Griff bekommen hatte',
                'Weil er bei Marie Antoinette in Ungnade gefallen war'
              ], [0]))
      ]);
      
      addFact(7, [
          Question.create(id(7, 0), Difficulty.EASY, 'Welches Datum gilt als Jahrestag des Sturms auf die Bastille?',
              MultipleChoice.create(0, [
                '17. Mai',
                '4. Juli',
                '14. Juli'
              ], [2])),
          Question.create(id(7, 1), Difficulty.MEDIUM, 'Was wollten die Demonstranten durch den Sturm auf die Bastille erreichen?',
              MultipleChoice.create(0, [
                'Sie wollten sich Munition beschaffen',
                'Sie wollten Gefangene befreien',
                'Sie wollten den Marquis de Sade befreien'
              ], [0]))
      ]);

      addFact(8, [
          Question.create(id(8, 0), Difficulty.MEDIUM, 'Welche direkten Konsequenzen hatte der Sturm auf die Bastille?',
              MultipleChoice.create(0, [
                'Den Abriss der Bastille',
                'Die Wiedereinsetzung von Jacques Necker als Finanzminister',
                'Die Hinrichtung der Aufständischen',
                'Die Gründung der Nationalversammlung',
                'Die Einberufung der Generalstände'
              ], [0, 1])),
          Question.create(id(8, 1), Difficulty.MEDIUM, 'Wann wurde Jacques Necker - nach seiner Absetzung am 11. Juli 1789 - wieder in sein Amt als Finanzminister eingesetzt?',
              MultipleChoice.create(0, [
                'Am 16. Juli 1789',
                'Am 6. September 1790',
                'Nie'
              ], [0]))
      ]);
      
      addFact(9, [
          Question.create(id(9, 0), Difficulty.MEDIUM, 'Was versteht man unter der „Grande Peur“?',
              MultipleChoice.create(0, [
                'Die gewaltsamen Bauernaufstände aus Angst vor dem Adel und Räuberbanden',
                'Die Finanzkrise zu Beginn der Französichen Revolution',
                'Die Verstaatlichung der kirchlichen Besitztümer'
              ], [0])),
          Question.create(id(9, 1), Difficulty.MEDIUM, 'Was waren die Auslöser für die „Grande Peur“?',
              MultipleChoice.create(0, [
                'Die Angst vor dem Adel',
                'Die Angst vor Räuberbanden',
                'Die Unzufriedenheit mit dem König',
                'Die Privilegien des 1. und 2. Standes'
              ], [0, 1])),
          Question.create(id(9, 2), Difficulty.MEDIUM, 'Wie reagierte die Nationalversammlung auf die Aufstände während der „Grande Peur“?',
              MultipleChoice.create(0, [
                'Sie schaffte einige Privilegien des 1. und 2. Standes ab',
                'Sie verstaatlichte die kirchlichen Besitztümer',
                'Sie liess die Aufstände niederschlagen',
                'Sie veranlasste die Inhaftierung des Königs'
              ], [0])),
          Question.create(id(9, 3), Difficulty.MEDIUM, 'Wann begann die „Grande Peur“?',
              TimeChoice.create(0, DateSelector.month(1, 1780), DateSelector.month(12, 1810), DateSelector.month(7, 1789))),
          Question.create(id(9, 4), Difficulty.MEDIUM, 'Wann endete die „Grande Peur“?',
              TimeChoice.create(0, DateSelector.month(1, 1780), DateSelector.month(12, 1810), DateSelector.month(8, 1789)))
      ]);
      
      addFact(10, [
          Question.create(id(10, 0), Difficulty.MEDIUM, 'In welchem Jahr kam es zu den sogenannten Augustbeschlüssen?',
              TimeChoice.create(0, DateSelector.year(1780), DateSelector.year(1810), DateSelector.year(1789))),
          Question.create(id(10, 1), Difficulty.MEDIUM, 'Was wurde bei den sogenannten Augustbeschlüssen vereinbart?',
              MultipleChoice.create(0, [
                'Die Abschaffung der Leibeigenschaft',
                'Die Abschaffung der Feudalherrschaft',
                'Die Rechtsgleichheit',
                'Die Abschaffung der Steuerprivilegien von Adel und Klerus',
                'Kostenloser Zugang zur Justiz',
                'Die Absetzung des Königs',
                'Die Verstaatlichung der kirchlichen Besitztümer',
                'Die Erklärung der Menschen- und Bürgerrechte'
              ], [0, 1, 2, 3, 4]))
      ]);
      
      addFact(11, [
          Question.create(id(11, 0), Difficulty.MEDIUM, 'An welchem Datum erfolgte die Erklärung der Menschen- und Bürgerrechte?',
              TimeChoice.create(0, DateSelector.day(1, 1, 1780), DateSelector.day(31, 12, 1810), DateSelector.day(26, 8, 1789))),
          Question.create(id(11, 1), Difficulty.MEDIUM, 'Was ist NICHT Bestandteil der am 26. August 1789 verkündeten Menschen- und Bürgerrechte?',
              MultipleChoice.create(0, [
                'Die Gleichstellung von Frauen',
                'Die Absetzung des Königs',
                'Die Abschaffung der Stände',
                'Die Wehrpflicht',
                'Das Recht auf Bildung',
                'Die Gewaltenteilung',
                'Die Gleichheit aller Menschen vor dem Gesetz',
                'Das Recht auf Eigentum',
                'Das Recht auf Freiheit',
                'Das Recht auf Sicherheit',
                'Das Recht auf Widerstand gegen Unterdrückung',
                'Das Recht auf Religionsfreiheit',
                'Das Recht auf Meinungsfreiheit',
                'Die Souveränität liegt beim Volk',
                'Die Steuerpflicht',
                'Die Unschuldsvermutung'
              ], [0, 1, 2, 3, 4]))
      ]);
      
      addFact(12, [
          Question.create(id(12, 0), Difficulty.MEDIUM, 'Wann fand der Zug der Marktfrauen nach Versailles statt?',
              TimeChoice.create(0, DateSelector.day(1, 1, 1780), DateSelector.day(31, 12, 1810), DateSelector.day(5, 10, 1789))),
          Question.create(id(12, 1), Difficulty.MEDIUM, 'Bringe die folgenden Ereignisse in die richtige Reihenfolge:',
              OrderChoice.create(0, [
                'Die Augustbeschlüsse',
                'Zug der Marktfrauen nach Versailles',
                'Der König bestätigt die Gesetzgebungsgewalt der Nationalversammlung'
              ], [0, 1, 2]))
      ]);
      
      addFact(13, [
          Question.create(id(13, 0), Difficulty.MEDIUM, 'Was versteht man unter der Säkularisation',
              MultipleChoice.create(0, [
                'Die Verstaatlichung des Kirchenbesitzes',
                'Die Trennung in Stände',
                'Die Finanzkrise zu Beginn der Französischen Revolution'
              ], [0])),
          Question.create(id(13, 1), Difficulty.MEDIUM, 'Warum wurde am 2. November 1789 der Kirchenbesitz verstaatlicht?',
              MultipleChoice.create(1, [
                'Um einen drohenden Staatsbankrott aufzuhalten',
                'Weil sich der Klerus nicht der Nationalversammlung anschliessen wollte',
                'Um die Vertreter des Klerus in der Nationalversammlung zu schwächen'
              ], [0])),
          Question.create(id(13, 2), Difficulty.MEDIUM, 'Am 2. November 1789 beschloss{nationalversammlung} den Besitz {kirche} zu verstaatlichen, um einen Staatsbankrott zu verhinden',
              GapChoice.create(0, [
               'Nationalversammlung',
               'Kirche',
               'Adel',
               'dritter Stand',
               'Generalstände',
               'König'
              ], {
                nationalversammlung: Gap.create([ ' die Nationalversammlung', ' die Kirche', ' der Adel', ' der Dritte Stand', 'en die Generalstände', ' der König' ], 0),
                kirche: Gap.create([ 'der Nationalversammlung', 'der Kirche', 'des Adels', 'des Dritten Standes', 'der Generalstände', 'des Königs' ], 1)
              }))
      ]);
      
      addFact(14, [
          Question.create(id(14, 0), Difficulty.EASY, 'In welchem Jahr wurden die Assignaten eingeführt?',
              TimeChoice.create(0, DateSelector.year(1780), DateSelector.year(1810), DateSelector.year(1789))),
          Question.create(id(14, 1), Difficulty.MEDIUM, 'Wann wurden die Assignaten eingeführt?',
              TimeChoice.create(0, DateSelector.day(1, 1, 1780), DateSelector.day(31, 12, 1810), DateSelector.day(17, 6, 1789))),
          Question.create(id(14, 2), Difficulty.MEDIUM, 'Was waren die sogenannten „Assignaten“?',
              MultipleChoice.create(0, [
                'Papiergeld',
                'Eine politische Vereinigung',
                'Eine Petition zur Absetzung des Königs'
              ], [0])),
          Question.create(id(14, 3), Difficulty.MEDIUM, 'Wodurch wurden die „Assignaten“ ursprünglich gedeckt?',
              MultipleChoice.create(0, [
                'Durch die verstaatlichten Kirchengüter',
                'Durch die Goldreserven Frankreichs',
                'Durch die Ländereien von Adligen'
              ], [0])),
          Question.create(id(14, 4), Difficulty.MEDIUM, 'Welchen Wertverlust (in Prozent) hatten die „Assignaten“ bis 1793?',
              ValueChoice.create(0, 0, 100, 50))
      ]);
      
      addFact(15, [
          Question.create(id(15, 0), Difficulty.EASY, 'In welchem Jahr wurden die Départements eingeführt?',
              TimeChoice.create(0, DateSelector.year(1780), DateSelector.year(1810), DateSelector.year(1789))),
          Question.create(id(15, 1), Difficulty.EASY, 'Wodurch wurden die Provinzen 1789 ersetzt?',
              MultipleChoice.create(0, [
                'Départements',
                'Bundesländer',
                'Kantone',
                'Distrikte',
                'Arrondissements'
              ], [0])),
          Question.create(id(15, 2), Difficulty.EASY, 'Ordne die folgenden Bezirksnamen der Größe nach aufsteigend:',
              OrderChoice.create(0, [
                'Département',
                'Distrikt',
                'Kanton'
              ], [0, 1, 2])),
          Question.create(id(15, 3), Difficulty.EASY, 'Worin unterschieden sich die 1789 eingeführten Départements von den bis dahin gültigen Provinzen?',
              MultipleChoice.create(0, [
                'Sie waren in etwa gleich groß',
                'Die Namensgebung richtete sich nach Bergen oder Flüssen',
                'Sie wurden von einer gewählten Versammlung verwaltet',
                'Sie hatten in etwa gleich viele Einwohner',
                'Sie wurden von einem Gouverneur geführt, der selbst Teil der Nationalversammlung war',
                'Sie wurden zentral durch die Nationalversammlung verwaltet'
              ], [0, 1, 2])),
          Question.create(id(15, 4), Difficulty.EASY, 'Wieviele Départements gab es zu Beginn der Französischen Revolution?',
              ValueChoice.create(0, 30, 110, 83))
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
