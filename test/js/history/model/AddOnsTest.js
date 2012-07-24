var AddOns = net.riemschneider.history.model.AddOns;

TestCase('AddOnsTest', {
  testCreate: function () {
    var addOns = AddOns.create();
    assertNotNull(addOns);
  },

  testUnlock: function () {
    var addOns = AddOns.create();
    assertFalse(addOns.isUnlocked('id'));
    addOns.unlock('id');
    assertTrue(addOns.isUnlocked('id'));
  },

  testGetAndSetState: function () {
    var addOns = AddOns.create();
    addOns.unlock('id1');
    addOns.unlock('id2');
    var other = AddOns.create();
    other.setState(addOns.getState());
    assertTrue(other.isUnlocked('id1'));
    assertTrue(other.isUnlocked('id2'));
  },

  testSetStateNullSafe: function () {
    var addOns = AddOns.create();
    assertException(function () { addOns.setState(null); }, 'TypeError');
    assertException(function () { addOns.setState({}); }, 'TypeError');
    assertException(function () { addOns.setState({ unlocked: 'bla' }); }, 'TypeError');
  }
});