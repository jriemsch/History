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
  },

  testMonthNullAndTypeSafe: function () {
    assertException(function () { DateSelector.month(1, null); }, 'TypeError');
    assertException(function () { DateSelector.month(null, 1); }, 'TypeError');
    assertException(function () { DateSelector.month(0, 1); }, 'TypeError');
    assertException(function () { DateSelector.month(13, 1); }, 'TypeError');

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

    DateSelector.day(1, 1, 1);
    DateSelector.day(31, 12, 1);
  }
});