net.riemschneider.history.controller = net.riemschneider.history.controller || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var ArrayUtils = net.riemschneider.utils.ArrayUtils;
  var Random = net.riemschneider.utils.Random;
  var Difficulty = net.riemschneider.history.model.Difficulty;

  net.riemschneider.history.controller.QuestionListGenerator = {
    create: function create(questionsByTopicAndFact) {
      ArgumentUtils.assertMap(questionsByTopicAndFact, function (topicId, facts) {
        ArgumentUtils.assertType(facts, net.riemschneider.history.model.Facts);
      });

      function calculateQuestionCounts(regions, distribution) {
        var regionCount = regions.getRegions().length;
        var remaining = regionCount;

        var questionCounts = [];
        for (var idx = 0, len = Difficulty.values.length; idx < len; ++idx) {
          var difficulty = Difficulty.values[idx];
          var weight = distribution[difficulty.key];
          var count = Math.floor(Math.min(weight * regionCount, remaining));
          questionCounts[difficulty.key] = count;
          remaining -= count;
        }

        questionCounts[Difficulty.EASY.key] += remaining;

        return questionCounts;
      }

      function addQuestionsOfDifficulty(randomFactGetter, questions, count, difficulty) {
        for (var idx = 0; idx < count; ++idx) {
          questions.push(createQuestion(randomFactGetter, difficulty));
        }
      }

      function createQuestion(randomFactGetter, difficulty) {
        var fact = randomFactGetter.next(difficulty);
        var questionsOfDifficulty = fact.getQuestionsOfDifficulty(difficulty);
        var count = questionsOfDifficulty.length;
        var idx = Math.floor(Random.next() * count);
        return questionsOfDifficulty[idx];
      }

      function generateQuestions(questionCounts, randomFactGetter) {
        var questions = [];
        for (var idx = 0, len = Difficulty.values.length; idx < len; ++idx) {
          var difficulty = Difficulty.values[idx];
          var count = questionCounts[difficulty.key];
          addQuestionsOfDifficulty(randomFactGetter, questions, count, difficulty);
        }
        return questions;
      }

      function createRandomFactGetter(facts) {
        var currentFactsByDifficulty = {};
        for (var idx = 0, len = Difficulty.values.length; idx < len; ++idx) {
          var difficulty = Difficulty.values[idx];
          currentFactsByDifficulty[difficulty.key] = facts.getFactsOfDifficulty(difficulty).slice();
        }

        function removeFactFromArrays(fact) {
          for (var idx = 0, len = Difficulty.values.length; idx < len; ++idx) {
            var difficulty = Difficulty.values[idx];
            ArrayUtils.removeElement(currentFactsByDifficulty[difficulty.key], fact);
          }
        }

        return {
          next: function next(difficulty) {
            var factsOfDifficulty = currentFactsByDifficulty[difficulty.key];
            var count = factsOfDifficulty.length;
            var idx = Math.floor(Random.next() * count);
            var fact = currentFactsByDifficulty[difficulty.key][idx];
            removeFactFromArrays(fact);
            return fact;
          }
        };
      }

      return {
        generate: function generate(topicId, regions, distribution) {
          ArgumentUtils.assertType(questionsByTopicAndFact[topicId], net.riemschneider.history.model.Facts);
          ArgumentUtils.assertType(regions, net.riemschneider.history.model.Regions);
          ArgumentUtils.assertMap(distribution);
          var total = 0;
          for (var idx = 0, len = Difficulty.values.length; idx < len; ++idx) {
            var difficulty = Difficulty.values[idx];
            var weight = distribution[difficulty.key];
            ArgumentUtils.assertRange(weight, 0, 1);
            total += weight;
          }
          ArgumentUtils.assertTrue(total >= 0.99999 && total <= 1.00001);

          var questionCounts = calculateQuestionCounts(regions, distribution);
          var randomFactGetter = createRandomFactGetter(questionsByTopicAndFact[topicId]);

          return generateQuestions(questionCounts, randomFactGetter);
        }
      };
    }
  };
}());
