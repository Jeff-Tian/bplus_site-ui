define([
  "angular",
  "text!./date.html"
], function(angular, template) {
  var CURRENT_DATE = new Date()
  var CURRENT_YEAR = CURRENT_DATE.getFullYear();
  var CURRENT_MONTH = CURRENT_DATE.getMonth();
  var CURRENT_DAY = CURRENT_DATE.getDate();
  var YEAR_RANGE = 150;
  // Month begins from 0
  var MAX_MONTH = 11;
  var MAX_DAY = 31;
  
  var createYears = function(begin, end) {
    var year = [];
    for (var i = end.year; i >= begin.year; i--) {
      year.push({value: i});
    }
    return year;
  }
  
  var createMonths = function(year, begin, end) {
    if (!year) {
      return;
    }
    var selectedYear = year.value;
    var monthBegin = selectedYear === begin.year ? begin.month : 0;
    var monthEnd = selectedYear === end.year ? end.month : MAX_MONTH;
    var targetMonths = [];
    for (var i = monthBegin; i <= monthEnd; i++) {
      targetMonths.push({
        value: i + 1
      })
    }
    return targetMonths;
  }
  
  var createDays = function(year, month, begin, end) {
    if (!year || !month) {
      return ;
    }
    var selectedYear = year.value;
    var selectedMonth = month.value - 1;
    var targetDate = new Date(selectedYear + "/" + (selectedMonth + 1) + "/01");
    var targetMonth = targetDate.getMonth();
    var dayBegin = (selectedYear === begin.year && selectedMonth === begin.month) ? begin.day : 1;
    var dayEnd = (selectedYear === end.year && selectedMonth === end.month) ? end.day : MAX_DAY;
    var targetDays = [];
    for (var i = dayBegin; i <= dayEnd; i++) {
      targetDate.setDate(i);
      if (targetDate.getMonth() === targetMonth) {
        targetDays.push({
          value: i
        })
      } else {
        break;
      }
    }
    return targetDays;
  }

  var BplusDate = function() {
  };
  BplusDate.prototype.constructor = BplusDate;
  BplusDate.prototype.start = function(agModel) {
    agModel.
    directive("bplusdate", function() {
      return {
        restrict: 'E',
        template: template,
        scope: {
//        config: {
//          showYear,
//          showMonth,
//          showDay,
//          begin: {
//            year,
//            month,
//            day
//          },
//          end: {
//            year,
//            month,
//            day
//          }
//        }
          config: "=",
          value: "=",
          fullfilled: "="
        },
        link: function(scope, element) {
          if (!scope.config.begin) {
            scope.config.begin = {
              year: CURRENT_YEAR - YEAR_RANGE,
              month: 0,
              day: 1
            }
          }
          if (!scope.config.end) {
            scope.config.end = {
              year: CURRENT_YEAR,
              month: CURRENT_MONTH,
              day: CURRENT_DAY
            }
          }
          scope.displayData = {
            years: createYears(scope.config.begin, scope.config.end),
            months: [],
            days: []
          };
          scope.selectYear = function() {
            if (scope.config.showMonth) {
              scope.value.day = {};
              scope.value.month = {};
              scope.displayData.months = createMonths(scope.value.year, scope.config.begin, scope.config.end);
            }
          };
          scope.selectMonth = function() {
            if (scope.config.showDay) {
              scope.value.day = {};
              scope.displayData.days = createDays(scope.value.year, scope.value.month, scope.config.begin, scope.config.end);
            }
          };
          scope.$watch("value", function(newValue){
            scope.fullfilled = !!(newValue.day.value &&  newValue.month.value && newValue.year.value); 
          }, true)
        }
      }
    })
  }
  return BplusDate;
});