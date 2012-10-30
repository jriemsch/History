var AddOns = net.riemschneider.history.model.AddOns;
var BaseOpponentsReader = net.riemschneider.history.data.BaseOpponentsReader;
var WebUtils = net.riemschneider.utils.WebUtils;

TestCase('BaseOpponentsReader', {
  testCreate: function () {
    var opponents = [];
    var reader = BaseOpponentsReader.create(opponents);
    assertNotUndefined(reader);
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { BaseOpponentsReader.create(null); }, 'TypeError');

    assertException(function () { BaseOpponentsReader.create({}); }, 'TypeError');
  },

  testRead: function () {
    var opponents = [];
    var reader = BaseOpponentsReader.create(opponents);
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
    reader.read('testOpponentsData.json');
    assertEquals(2, opponents.length);
    assertEquals('OPP0', opponents[0].getId());
    assertEquals('OPP1', opponents[1].getId());
  },

  testReadNullAndTypeSafe: function () {
    var opponents = [];
    var reader = BaseOpponentsReader.create(opponents);

    assertException(function () { reader.read(null); }, 'TypeError');

    assertException(function () { reader.read({}); }, 'TypeError');
  }
});