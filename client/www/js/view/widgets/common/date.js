define([
  "angular",
  "text!./date.html"
], function(angular, template) {
  var CURRENT_DATE = new Date()
  var YEAR_RANGE = 150;
  
  var createYears = function() {
    var year = [];
    for (var i = YEAR_RANGE; i > 0; i--) {
      year.push({value: CURRENT_DATE.getFullYear() - YEAR_RANGE + i});
    }
    return year;
  }
  
  var createMonths = function(year) {
    if (!year) {
      return;
    }
    var selectedYear = year;
    var targetDate = new Date(selectedYear.value + "/01/01");
    var maxMonth = 12;
    var targetMonths = [];
    if (selectedYear && selectedYear.value) {
      if (CURRENT_DATE.getFullYear() === targetDate.getFullYear()) {
        maxMonth = CURRENT_DATE.getMonth() + 1;
      }
    }
    for (var i = 0; i < maxMonth; i++) {
      targetMonths.push({
        value: i + 1
      })
    }
    return targetMonths;
  }
  
  var createDays = function(year, month) {
    if (!year || !month) {
      return ;
    }
    var selectedYear = year;
    var selectedMonth = month;
    var targetDate = new Date(selectedYear.value + "/" + selectedMonth.value + "/01");
    var targetYear = targetDate.getFullYear();
    var targetMonth = targetDate.getMonth();
    var maxDay = 31;
    var targetDays = [];
    if (selectedMonth && selectedMonth.value) {
      if (CURRENT_DATE.getFullYear() === targetYear
      && CURRENT_DATE.getMonth() === targetMonth) {
        maxDay = CURRENT_DATE.getDate();
      }
    }
    for (var i = 1; i <= maxDay; i++) {
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
        controller: function($scope) {
          $scope.dateSelect.displaydata = {
            years: createYears(),
            months: [],
            days: []
          };
          $scope.selectYear = function() {
            $scope.dateSelect.value.month = "";
            $scope.dateSelect.value.day = "";
            $scope.dateSelect.displaydata.months = createMonths($scope.dateSelect.value.year);
          };
          $scope.selectMonth = function() {
            $scope.dateSelect.value.day = "";
            $scope.dateSelect.displaydata.days = createDays($scope.dateSelect.value.year, $scope.dateSelect.value.month);
          };
          $scope.dateSelect.required = false;
          $scope.$watch("dateSelect.value", function(newValue){
            $scope.dateSelect.required = !!(newValue.day &&  newValue.month && newValue.year); 
          }, true)
        }
      }
    })
  }
  return BplusDate;
});