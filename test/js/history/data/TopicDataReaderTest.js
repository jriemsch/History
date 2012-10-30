var AddOns = net.riemschneider.history.model.AddOns;
var TopicDataReader = net.riemschneider.history.data.TopicDataReader;
var WebUtils = net.riemschneider.utils.WebUtils;

TestCase('TopicDataReaderTest', {
  testCreate: function () {
    var topicsById = {};
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};
    var reader = TopicDataReader.create(topicsById, questionsByTopicAndFact, addOns, regionsByTopic);
    assertNotUndefined(reader);
  },

  testCreateNullAndTypeSafe: function () {
    var topicsById = {};
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};

    assertException(function () { TopicDataReader.create(topicsById, questionsByTopicAndFact, addOns, null); }, 'TypeError');
    assertException(function () { TopicDataReader.create(topicsById, questionsByTopicAndFact, null, regionsByTopic); }, 'TypeError');
    assertException(function () { TopicDataReader.create(topicsById, null, addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { TopicDataReader.create(null, questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');

    assertException(function () { TopicDataReader.create(topicsById, questionsByTopicAndFact, addOns, []); }, 'TypeError');
    assertException(function () { TopicDataReader.create(topicsById, questionsByTopicAndFact, {}, regionsByTopic); }, 'TypeError');
    assertException(function () { TopicDataReader.create(topicsById, [], addOns, regionsByTopic); }, 'TypeError');
    assertException(function () { TopicDataReader.create([], questionsByTopicAndFact, addOns, regionsByTopic); }, 'TypeError');
  },

  testRead: function () {
    var topicsById = {};
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};
    var reader = TopicDataReader.create(topicsById, questionsByTopicAndFact, addOns, regionsByTopic);
    var testData = {
      topic: {
        id: 'TEST_TOPIC',
        name: 'Test Topic',
        imgSrc: 'topic.png',
        mapImageSrc: 'map.png',
        mapImageSize: { x: 42, y: 52 }
      },
      unlocked: true,
      regions: [],
      facts: []
    };
    WebUtils.expectRequest('testTopicData.json', testData);
    reader.read('testTopicData.json');
    assertNotUndefined(topicsById['TEST_TOPIC']);
    assertTrue(TypeUtils.isOfType(questionsByTopicAndFact['TEST_TOPIC'], net.riemschneider.history.model.Facts));
    assertTrue(TypeUtils.isOfType(regionsByTopic['TEST_TOPIC'], net.riemschneider.history.model.Regions));
    assertTrue(addOns.isUnlocked('TEST_TOPIC'));
  },

  testReadNullAndTypeSafe: function () {
    var topicsById = {};
    var questionsByTopicAndFact = {};
    var addOns = AddOns.create();
    var regionsByTopic = {};
    var reader = TopicDataReader.create(topicsById, questionsByTopicAndFact, addOns, regionsByTopic);

    assertException(function () { reader.read(null); }, 'TypeError');

    assertException(function () { reader.read(23); }, 'TypeError');
  }
});