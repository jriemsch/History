var Topic = net.riemschneider.history.model.Topic;

TestCase('TopicTest', {
  testCreateAndGetters: function () {
    var topic = Topic.create('ID', 'Name', 'image', 'mapImage');
    assertNotNull(topic);
    assertEquals('ID', topic.getId());
    assertEquals('Name', topic.getName());
    assertEquals('image', topic.getImage());
    assertEquals('mapImage', topic.getMapImage());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { Topic.create('ID', 'name', 'image', null); }, 'TypeError');
    assertException(function () { Topic.create('ID', 'name', null, 'mapImage'); }, 'TypeError');
    assertException(function () { Topic.create('ID', null, 'image', 'mapImage'); }, 'TypeError');
    assertException(function () { Topic.create(null, 'name', 'image', 'mapImage'); }, 'TypeError');

    assertException(function () { Topic.create('ID', 'name', 'image', {}); }, 'TypeError');
    assertException(function () { Topic.create('ID', 'name', {}, 'mapImage'); }, 'TypeError');
    assertException(function () { Topic.create('ID', {}, 'image', 'mapImage'); }, 'TypeError');
    assertException(function () { Topic.create(12, 'name', 'image', 'mapImage'); }, 'TypeError');
  }
});