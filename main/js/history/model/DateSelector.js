net.riemschneider.history.model = net.riemschneider.history.model || {};

(function () {
  "use strict";

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
      getYear: function getYear() { return year; },
      equals: function equals(other) {
        ArgumentUtils.assertType(other, net.riemschneider.history.model.DateSelector);
        return year === other.getYear() && month === other.getMonth() && day === other.getDay();
      }
    };
  }

  net.riemschneider.history.model.DateSelector = {
    SelectorType: TypeUtils.enhanceEnum('net.riemschneider.history.model.DateSelector.SelectorType', {
      YEAR: { key: 'YEAR' },
      MONTH: { key: 'MONTH' },
      DAY: { key: 'DAY' }
    }),

    day: function day(d, m, y) {
      ArgumentUtils.assertRange(d, 1, 31);
      ArgumentUtils.assertRange(m, 1, 12);
      ArgumentUtils.assertNumber(y);
      return create(y, m, d);
    },

    month: function month(m, y) {
      ArgumentUtils.assertRange(m, 1, 12);
      ArgumentUtils.assertNumber(y);
      return create(y, m);
    },

    year: function year(y) {
      ArgumentUtils.assertNumber(y);
      return create(y);
    },

    fromStr: function fromStr(dateStr) {
      ArgumentUtils.assertString(dateStr);
      var parts = dateStr.split('.');
      ArgumentUtils.assertRange(parts.length, 1, 3);
      if (parts.length === 1) {
        return net.riemschneider.history.model.DateSelector.year(parseInt(parts[0], 10));
      }
      else if (parts.length === 2) {
        return net.riemschneider.history.model.DateSelector.month(parseInt(parts[0], 10), parseInt(parts[1], 10));
      }

      return net.riemschneider.history.model.DateSelector.day(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10));
    }
  };

  TypeUtils.enhanceByMethods('net.riemschneider.history.model.DateSelector',
      ['day', 'month', 'year'],
      net.riemschneider.history.model.DateSelector);
}());