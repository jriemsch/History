var QuestionListGenerator = net.riemschneider.history.controller.QuestionListGenerator;
var Question = net.riemschneider.history.model.Question;
var Difficulty = net.riemschneider.history.model.Difficulty;
var Answer = net.riemschneider.history.model.Answer;
var Fact = net.riemschneider.history.model.Fact;
var Facts = net.riemschneider.history.model.Facts;
var Region = net.riemschneider.history.model.Region;
var Regions = net.riemschneider.history.model.Regions;
var Position = net.riemschneider.graphics.Position;
var ImageData = net.riemschneider.graphics.ImageData;
var Random = net.riemschneider.utils.Random;

TestCase('QuestionListGeneratorTest', {
  setUp: function () {
    this.questionsByTopicAndFact = {
      topic: Facts.create([
        Fact.create([
          Question.create('Q1', Difficulty.EASY, 'question?', Answer.create(0)),
          Question.create('Q2', Difficulty.EASY, 'question?', Answer.create(0))
        ]),
        Fact.create([
          Question.create('Q3', Difficulty.MEDIUM, 'question?', Answer.create(0)),
          Question.create('Q4', Difficulty.HARD, 'question?', Answer.create(0))
        ]),
        Fact.create([
          Question.create('Q5', Difficulty.EASY, 'question?', Answer.create(0))
        ]),
        Fact.create([
          Question.create('Q6', Difficulty.HARD, 'question?', Answer.create(0))
        ])
      ])
    };

    var pos = Position.create(0, 0);
    var imgData = ImageData.create('img', pos, pos);

    this.regions = Regions.create([
      Region.create('R1', imgData, pos),
      Region.create('R2', imgData, pos),
      Region.create('R3', imgData, pos),
      Region.create('R4', imgData, pos)
    ]);

    this.distribution = {};
    this.distribution[Difficulty.EASY.key] = 0.5;
    this.distribution[Difficulty.MEDIUM.key] = 0.25;
    this.distribution[Difficulty.HARD.key] = 0.25;
  },

  testCreate: function () {
    var questionListGenerator = QuestionListGenerator.create(this.questionsByTopicAndFact);
    assertNotNull(questionListGenerator);
  },

  testGenerate: function () {
    Random.setNext([0.1, 0.7, 0, 0, 0.9, 0.9, 0, 0]);
    var questionListGenerator = QuestionListGenerator.create(this.questionsByTopicAndFact);
    var questions = questionListGenerator.generate('topic', this.regions, this.distribution);
    assertEquals(4, questions.length);
    assertEquals('Q2', questions[0].getId());
    assertEquals('Q5', questions[1].getId());
    assertEquals('Q3', questions[2].getId());
    assertEquals('Q6', questions[3].getId());
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { QuestionListGenerator.create(null); }, 'TypeError');
    assertException(function () { QuestionListGenerator.create([]); }, 'TypeError');
    assertException(function () { QuestionListGenerator.create({ topic: {} }); }, 'TypeError');
  },

  testGenerateNullAndTypeSafe: function () {
    var questionListGenerator = QuestionListGenerator.create(this.questionsByTopicAndFact);

    var incorrectDistribution = {};
    incorrectDistribution[Difficulty.EASY.key] = 'a';
    incorrectDistribution[Difficulty.MEDIUM.key] = 0.25;
    incorrectDistribution[Difficulty.HARD.key] = 0.25;

    var incompleteDistribution = {};
    incorrectDistribution[Difficulty.MEDIUM.key] = 0.25;
    incorrectDistribution[Difficulty.HARD.key] = 0.25;

    var regions = this.regions;
    var distribution = this.distribution;

    assertException(function () { questionListGenerator.generate('topic', regions, null); }, 'TypeError');
    assertException(function () { questionListGenerator.generate('topic', null, distribution); }, 'TypeError');
    assertException(function () { questionListGenerator.generate(null, regions, distribution); }, 'TypeError');

    assertException(function () { questionListGenerator.generate('topic', regions, []); }, 'TypeError');
    assertException(function () { questionListGenerator.generate('topic', regions, {}); }, 'TypeError');
    assertException(function () { questionListGenerator.generate('topic', regions, incorrectDistribution); }, 'TypeError');
    assertException(function () { questionListGenerator.generate('topic', regions, incompleteDistribution); }, 'TypeError');

    assertException(function () { questionListGenerator.generate('topic', {}, distribution); }, 'TypeError');
    assertException(function () { questionListGenerator.generate(45, regions, distribution); }, 'TypeError');
    assertException(function () { questionListGenerator.generate('wrong', regions, distribution); }, 'TypeError');
  }
});