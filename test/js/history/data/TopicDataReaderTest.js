var AddOns = net.riemschneider.history.model.AddOns;
var TopicDataReader = net.riemschneider.history.data.TopicDataReader;
var WebUtils = net.riemschneider.utils.WebUtils;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('TopicDataReaderTest', {
  testCreate: function () {
    var reader = TopicDataReader.create();
    assertNotUndefined(reader);
  },

  testRead: function () {
    var reader = TopicDataReader.create();
    var testData = {
      topic: {
        id: 'TEST_TOPIC',
        name: 'Test Topic',
        imgSrc: 'topic.png',
        mapImageSrc: 'map.png',
        mapImageSize: { x: 42, y: 52 },
        year: 1900
      },
      unlocked: true,
      regions: [],
      facts: []
    };
    WebUtils.expectRequest('testTopicData.json', testData);
    var addTopicCalled = false;
    var onDoneCalled = false;
    reader.read('testTopicData.json', addTopic, onDone);

    function addTopic(topic, regions, facts, unlocked) {
      assertTrue(TypeUtils.isOfType(topic, net.riemschneider.history.model.Topic));
      assertTrue(TypeUtils.isOfType(facts, net.riemschneider.history.model.Facts));
      assertTrue(TypeUtils.isOfType(regions, net.riemschneider.history.model.Regions));
      assertEquals('TEST_TOPIC', topic.getId());
      assertTrue(unlocked);
      assertFalse(onDoneCalled);
      addTopicCalled = true;
    }
    function onDone() { onDoneCalled = true; }

    assertTrue(addTopicCalled);
    assertTrue(onDoneCalled);
  },

  testReadNullAndTypeSafe: function () {
    var reader = TopicDataReader.create();
    var func = function () {};

    assertException(function () { reader.read('testTopicData.json', func, null); }, 'TypeError');
    assertException(function () { reader.read('testTopicData.json', null, func); }, 'TypeError');
    assertException(function () { reader.read(null, func, func); }, 'TypeError');

    assertException(function () { reader.read('testTopicData.json', func, {}); }, 'TypeError');
    assertException(function () { reader.read('testTopicData.json', {}, func); }, 'TypeError');
    assertException(function () { reader.read({}, func, func); }, 'TypeError');
  }
});