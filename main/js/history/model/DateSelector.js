net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  function create(year, month, day) {
    return {
      getSelectorType: function getSelectorType() {
        if (typeof day !== 'undefined') {
          return net.riemschneider.history.model.DateSelector.SelectorType.DAY;
        } else if (typeof month !== 'undefined') {
          return net.riemschneider.history.model.DateSelector.SelectorType.MONTH;
        }
        return net.riemschneider.history.model.DateSelector.SelectorType.YEAR;
      },
      getValue: function getValue() {
        if (typeof day !== 'undefined') {
          return (year * 12 + month - 1) * 31 + day - 1;
        } else if (typeof month !== 'undefined') {
          return (year * 12 + month - 1) * 31;
        }
        return year * 12 * 31;
      },
      getDay: function getDay() { return day; },
      getMonth: function getMonth() { return month; },
      getYear: function getYear() { return year; }
    }
  }

  net.riemschneider.history.model.DateSelector = TypeUtils.enhanceByMethods('net.riemschneider.history.model.DateSelector', ['day', 'month', 'year'], {
    SelectorType: TypeUtils.enhanceEnum('net.riemschneider.history.model.DateSelector.SelectorType', {
      YEAR: { key: 'YEAR' },
      MONTH: { key: 'MONTH' },
      DAY: { key: 'DAY' }
    }),

    day: function day(day, month, year) {
      ArgumentUtils.assertRange(day, 1, 31);
      ArgumentUtils.assertRange(month, 1, 12);
      ArgumentUtils.assertNotNull(year);
      return create(year, month, day);
    },

    month: function month(month, year) {
      ArgumentUtils.assertRange(month, 1, 12);
      ArgumentUtils.assertNotNull(year);
      return create(year, month);
    },

    year: function year(year) {
      ArgumentUtils.assertNotNull(year);
      return create(year);
    }
  });
}());