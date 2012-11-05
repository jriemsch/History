var BaseOpponentsReader = net.riemschneider.history.data.BaseOpponentsReader;
var WebUtils = net.riemschneider.utils.WebUtils;

TestCase('BaseOpponentsReader', {
  testCreate: function () {
    var reader = BaseOpponentsReader.create();
    assertNotUndefined(reader);
  },

  testRead: function () {
    var reader = BaseOpponentsReader.create();
    var testData = [
      {
        id: 'OPP0',
        name: 'name0',
        avatarImageIdx: 0,
        difficulty: 'EASY',
        knowledgeChancesByLevel: [ 0.9, 0.5, 0.1 ],
        levelOrderChances: [ { levelOrder: [ 2, 1, 0 ], chance: 0.9 } ]
      },
      {
        id: 'OPP1',
        name: 'name1',
        avatarImageIdx: 1,
        difficulty: 'MEDIUM',
        knowledgeChancesByLevel: [ 0.1, 0.2, 0.3 ],
        levelOrderChances: [ { levelOrder: [ 0, 1, 2 ], chance: 0.5 } ]
      }
    ];
    WebUtils.expectRequest('testOpponentsData.json', testData);
    var opponents = [];
    var onDoneCalled = false;
    reader.read('testOpponentsData.json', addOpponent, onDone);

    function addOpponent(opponent) {
      opponents.push(opponent);
      assertFalse(onDoneCalled);
    }
    function onDone() { onDoneCalled = true; }

    assertEquals(2, opponents.length);
    assertEquals('OPP0', opponents[0].getId());
    assertEquals('OPP1', opponents[1].getId());
    assertTrue(onDoneCalled);
  },

  testReadNullAndTypeSafe: function () {
    var reader = BaseOpponentsReader.create();
    var func = function () {};

    assertException(function () { reader.read('testOpponentsData.json', func, null); }, 'TypeError');
    assertException(function () { reader.read('testOpponentsData.json', null, func); }, 'TypeError');
    assertException(function () { reader.read(null, func, func); }, 'TypeError');

    assertException(function () { reader.read('testOpponentsData.json', func, {}); }, 'TypeError');
    assertException(function () { reader.read('testOpponentsData.json', {}, func); }, 'TypeError');
    assertException(function () { reader.read({}, func, func); }, 'TypeError');
  }
});