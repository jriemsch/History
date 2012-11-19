var Topic = net.riemschneider.history.model.Topic;
var TypeUtils = net.riemschneider.utils.TypeUtils;
var Position = net.riemschneider.graphics.Position;
var ImageData = net.riemschneider.graphics.ImageData;

TestCase('TopicTest', {
  testCreateAndGetters: function () {
    var mapImgData = ImageData.create('mapImage', Position.ZERO, Position.create(1, 2));
    var topic = Topic.create('ID', 'Name', 'image', mapImgData, 1900);
    assertNotNull(topic);
    assertTrue(TypeUtils.isOfType(topic, Topic));
    assertEquals('ID', topic.getId());
    assertEquals('Name', topic.getName());
    assertEquals('image', topic.getImage());
    assertEquals('mapImage', topic.getMapImgData().getImgSrc());
    assertEquals(1, topic.getMapImgData().getImgSize().getX());
    assertEquals(2, topic.getMapImgData().getImgSize().getY());
    assertEquals(1900, topic.getYear());
  },

  testNullAndTypeSafe: function () {
    var mapImgData = ImageData.create('mapImage', Position.ZERO, Position.create(1, 2));

    assertException(function () { Topic.create('ID', 'name', 'image', mapImgData, null); }, 'TypeError');
    assertException(function () { Topic.create('ID', 'name', 'image', null, 1900); }, 'TypeError');
    assertException(function () { Topic.create('ID', 'name', null, mapImgData, 1900); }, 'TypeError');
    assertException(function () { Topic.create('ID', null, 'image', mapImgData, 1900); }, 'TypeError');
    assertException(function () { Topic.create(null, 'name', 'image', mapImgData, 1900); }, 'TypeError');

    assertException(function () { Topic.create('ID', 'name', 'image', mapImgData, '1900'); }, 'TypeError');
    assertException(function () { Topic.create('ID', 'name', 'image', {}, 1900); }, 'TypeError');
    assertException(function () { Topic.create('ID', 'name', {}, mapImgData, 1900); }, 'TypeError');
    assertException(function () { Topic.create('ID', {}, 'image', mapImgData, 1900); }, 'TypeError');
    assertException(function () { Topic.create(12, 'name', 'image', mapImgData, 1900); }, 'TypeError');
  },

  testCreateFromState: function () {
    var size = { x: 1, y: 2 };
    var topic = Topic.createFromState({ id: 'ID', name: 'Name', imgSrc: 'image', mapImageSrc: 'mapImage', mapImageSize: size, year: 1900 });
    assertNotNull(topic);
    assertTrue(TypeUtils.isOfType(topic, Topic));
    assertEquals('ID', topic.getId());
    assertEquals('Name', topic.getName());
    assertEquals('image', topic.getImage());
    assertEquals('mapImage', topic.getMapImgData().getImgSrc());
    assertEquals(1, topic.getMapImgData().getImgSize().getX());
    assertEquals(2, topic.getMapImgData().getImgSize().getY());
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