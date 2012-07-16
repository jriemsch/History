var Topic = net.riemschneider.history.model.Topic;

TestCase('TopicTest', {
  testCreateAndGetters: function () {
    var topic = Topic.create('ID', 'Name', 'image');
    assertNotNull(topic);
    assertEquals('ID', topic.getId());
    assertEquals('Name', topic.getName());
    assertEquals('image', topic.getImage());
  },

  testNullSafe: function () {
    assertException(function () { Topic.create('ID', 'name', null); }, 'TypeError');
    assertException(function () { Topic.create('ID', null, 'image'); }, 'TypeError');
    assertException(function () { Topic.create(null, 'name', 'image'); }, 'TypeError');
  }
});