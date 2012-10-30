var DateSelector = net.riemschneider.history.model.DateSelector;

TestCase('DateSelectorTest', {
  testYear: function () {
    var selector = DateSelector.year(4);
    assertEquals(DateSelector.SelectorType.YEAR, selector.getSelectorType());
    assertEquals(4, selector.getYear());
  },

  testMonth: function () {
    var selector = DateSelector.month(1, 4);
    assertEquals(DateSelector.SelectorType.MONTH, selector.getSelectorType());
    assertEquals(4, selector.getYear());
    assertEquals(1, selector.getMonth());
  },

  testDay: function () {
    var selector = DateSelector.day(5, 1, 4);
    assertEquals(DateSelector.SelectorType.DAY, selector.getSelectorType());
    assertEquals(4, selector.getYear());
    assertEquals(1, selector.getMonth());
    assertEquals(5, selector.getDay());
  },

  testGetValue: function () {
    var selector1 = DateSelector.day(1, 1, 4);
    var selector2 = DateSelector.month(1, 4);
    var selector3 = DateSelector.year(4);
    var selector4 = DateSelector.day(2, 2, 5);

    assertEquals(selector1.getValue(), selector2.getValue());
    assertEquals(selector1.getValue(), selector3.getValue());
    assertNotEquals(selector1.getValue(), selector4.getValue());
  },

  testYearNullAndTypeSafe: function () {
    assertException(function () { DateSelector.year(null); }, 'TypeError');
    assertException(function () { DateSelector.year(''); }, 'TypeError');
    assertException(function () { DateSelector.year(0 / 0); }, 'TypeError');
  },

  testMonthNullAndTypeSafe: function () {
    assertException(function () { DateSelector.month(1, null); }, 'TypeError');
    assertException(function () { DateSelector.month(null, 1); }, 'TypeError');
    assertException(function () { DateSelector.month(0, 1); }, 'TypeError');
    assertException(function () { DateSelector.month(13, 1); }, 'TypeError');
    assertException(function () { DateSelector.month(1, 0 / 0); }, 'TypeError');
    assertException(function () { DateSelector.month(0 / 0, 1); }, 'TypeError');

    DateSelector.month(1, 1);
    DateSelector.month(12, 1);
  },

  testDayNullAndTypeSafe: function () {
    assertException(function () { DateSelector.day(1, 1, null); }, 'TypeError');
    assertException(function () { DateSelector.day(1, null, 1); }, 'TypeError');
    assertException(function () { DateSelector.day(null, 1, 1); }, 'TypeError');
    assertException(function () { DateSelector.day(1, 0, 1); }, 'TypeError');
    assertException(function () { DateSelector.day(1, 13, 1); }, 'TypeError');
    assertException(function () { DateSelector.day(0, 1, 1); }, 'TypeError');
    assertException(function () { DateSelector.day(32, 1, 1); }, 'TypeError');
    assertException(function () { DateSelector.day(1, 1, 0 / 0); }, 'TypeError');
    assertException(function () { DateSelector.day(1, 0 / 0, 1); }, 'TypeError');
    assertException(function () { DateSelector.day(0 / 0, 1, 1); }, 'TypeError');

    DateSelector.day(1, 1, 1);
    DateSelector.day(31, 12, 1);
  },

  testEquals: function () {
    assertTrue(DateSelector.day(1, 2, 3).equals(DateSelector.day(1, 2, 3)));
    assertTrue(DateSelector.month(1, 2).equals(DateSelector.month(1, 2)));
    assertTrue(DateSelector.year(1).equals(DateSelector.year(1)));

    assertFalse(DateSelector.day(1, 2, 3).equals(DateSelector.day(1, 2, 4)));
    assertFalse(DateSelector.day(1, 2, 3).equals(DateSelector.day(1, 4, 3)));
    assertFalse(DateSelector.day(1, 2, 3).equals(DateSelector.day(4, 2, 3)));
    assertFalse(DateSelector.month(1, 2).equals(DateSelector.month(1, 3)));
    assertFalse(DateSelector.month(1, 2).equals(DateSelector.month(3, 2)));
    assertFalse(DateSelector.year(1).equals(DateSelector.year(2)));

    assertFalse(DateSelector.day(1, 2, 3).equals(DateSelector.month(1, 2)));
    assertFalse(DateSelector.day(1, 2, 3).equals(DateSelector.year(1)));
    assertFalse(DateSelector.month(1, 2).equals(DateSelector.year(1)));
  },

  testEqualsNullAndTypeSafe: function () {
    assertException(function () { DateSelector.year(1).equals(null); });
    assertException(function () { DateSelector.year(1).equals(0); });
  },

  testFromStr: function () {
    assertTrue(DateSelector.year(1981).equals(DateSelector.fromStr('1981')));
    assertTrue(DateSelector.month(2, 1981).equals(DateSelector.fromStr('2.1981')));
    assertTrue(DateSelector.day(1, 2, 1981).equals(DateSelector.fromStr('1.2.1981')));
  },

  testFromStrNullAndTypeSafe: function () {
    assertException(function () { DateSelector.fromStr(null); });
    assertException(function () { DateSelector.fromStr(0); });
    assertException(function () { DateSelector.fromStr(''); });
    assertException(function () { DateSelector.fromStr('a'); });
    assertException(function () { DateSelector.fromStr('a.b'); });
    assertException(function () { DateSelector.fromStr('a.b.c'); });
    assertException(function () { DateSelector.fromStr('1.2.3.4'); });
    assertException(function () { DateSelector.fromStr('0.2.3'); });
    assertException(function () { DateSelector.fromStr('32.2.3'); });
    assertException(function () { DateSelector.fromStr('1.0.3'); });
    assertException(function () { DateSelector.fromStr('1.13.3'); });
  }
});