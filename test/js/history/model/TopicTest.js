var Topic = net.riemschneider.history.model.Topic;
var TypeUtils = net.riemschneider.utils.TypeUtils;
var Position = net.riemschneider.graphics.Position;

TestCase('TopicTest', {
  testCreateAndGetters: function () {
    var topic = Topic.create('ID', 'Name', 'image', 'mapImage', Position.create(1, 2), 1900);
    assertNotNull(topic);
    assertTrue(TypeUtils.isOfType(topic, Topic));
    assertEquals('ID', topic.getId());
    assertEquals('Name', topic.getName());
    assertEquals('image', topic.getImage());
    assertEquals('mapImage', topic.getMapImage());
    assertEquals(1, topic.getMapImageSize().getX());
    assertEquals(2, topic.getMapImageSize().getY());
    assertEquals(1900, topic.getYear());
  },

  testNullAndTypeSafe: function () {
    var size = Position.create(1, 2);

    assertException(function () { Topic.create('ID', 'name', 'image', 'mapImage', size, null); }, 'TypeError');
    assertException(function () { Topic.create('ID', 'name', 'image', 'mapImage', null, 1900); }, 'TypeError');
    assertException(function () { Topic.create('ID', 'name', 'image', null, size, 1900); }, 'TypeError');
    assertException(function () { Topic.create('ID', 'name', null, 'mapImage', size, 1900); }, 'TypeError');
    assertException(function () { Topic.create('ID', null, 'image', 'mapImage', size, 1900); }, 'TypeError');
    assertException(function () { Topic.create(null, 'name', 'image', 'mapImage', size, 1900); }, 'TypeError');

    assertException(function () { Topic.create('ID', 'name', 'image', 'mapImage', size, '1900'); }, 'TypeError');
    assertException(function () { Topic.create('ID', 'name', 'image', 'mapImage', 'size', 1900); }, 'TypeError');
    assertException(function () { Topic.create('ID', 'name', 'image', {}, size, 1900); }, 'TypeError');
    assertException(function () { Topic.create('ID', 'name', {}, 'mapImage', size, 1900); }, 'TypeError');
    assertException(function () { Topic.create('ID', {}, 'image', 'mapImage', size, 1900); }, 'TypeError');
    assertException(function () { Topic.create(12, 'name', 'image', 'mapImage', size, 1900); }, 'TypeError');
  },

  testCreateFromState: function () {
    var size = { x: 1, y: 2 };
    var topic = Topic.createFromState({ id: 'ID', name: 'Name', imgSrc: 'image', mapImageSrc: 'mapImage', mapImageSize: size, year: 1900 });
    assertNotNull(topic);
    assertTrue(TypeUtils.isOfType(topic, Topic));
    assertEquals('ID', topic.getId());
    assertEquals('Name', topic.getName());
    assertEquals('image', topic.getImage());
    assertEquals('mapImage', topic.getMapImage());
    assertEquals(1, topic.getMapImageSize().getX());
    assertEquals(2, topic.getMapImageSize().getY());
  },

  testCreateFromStateNullAndTypeSafe: function () {
    var size = { x: 1, y: 2 };
    assertException(function () { Topic.createFromState(null); }, 'TypeError');

    assertException(function () { Topic.createFromState({ id: 'ID', name: 'Name', imgSrc: 'image', mapImageSrc: 'mapImage', mapImageSize: size }); }, 'TypeError');
    assertException(function () { Topic.createFromState({ id: 'ID', name: 'Name', imgSrc: 'image', mapImageSrc: 'mapImage', year: 1900 }); }, 'TypeError');
    assertException(function () { Topic.createFromState({ id: 'ID', name: 'Name', imgSrc: 'image', mapImageSize: size, year: 1900 }); }, 'TypeError');
    assertException(function () { Topic.createFromState({ id: 'ID', name: 'Name', mapImageSrc: 'mapImage', mapImageSize: size, year: 1900 }); }, 'TypeError');
    assertException(function () { Topic.createFromState({ id: 'ID', imgSrc: 'image', mapImageSrc: 'mapImage', mapImageSize: size, year: 1900 }); }, 'TypeError');
    assertException(function () { Topic.createFromState({ name: 'Name', imgSrc: 'image', mapImageSrc: 'mapImage', mapImageSize: size, year: 1900 }); }, 'TypeError');

    assertException(function () { Topic.createFromState({ id: 'ID', name: 'Name', imgSrc: 'image', mapImageSrc: 'mapImage', mapImageSize: size, year: '1900' }); }, 'TypeError');
    assertException(function () { Topic.createFromState({ id: 'ID', name: 'Name', imgSrc: 'image', mapImageSrc: 'mapImage', mapImageSize: 'size', year: 1900 }); }, 'TypeError');
    assertException(function () { Topic.createFromState({ id: 'ID', name: 'Name', imgSrc: 'image', mapImageSrc: {}, mapImageSize: size, year: 1900 }); }, 'TypeError');
    assertException(function () { Topic.createFromState({ id: 'ID', name: 'Name', imgSrc: {}, mapImageSrc: 'mapImage', mapImageSize: size, year: 1900 }); }, 'TypeError');
    assertException(function () { Topic.createFromState({ id: 'ID', name: {}, imgSrc: 'image', mapImageSrc: 'mapImage', mapImageSize: size, year: 1900 }); }, 'TypeError');
    assertException(function () { Topic.createFromState({ id: 12, name: 'Name', imgSrc: 'image', mapImageSrc: 'mapImage', mapImageSize: size, year: 1900 }); }, 'TypeError');
  }
});