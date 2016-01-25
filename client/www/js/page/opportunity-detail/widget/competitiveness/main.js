angular
    .module('opdModule')
    .directive('bopdCompetitiveness', function () {
        return {
            templateUrl: 'js/page/opportunity-detail/widget/competitiveness/main.html',
            link: function (scope, element, attrs) {
                var $element = angular.element(element),
                    $txt = $element.find('.bopd-competitiveness-txt'),
                    percent = parseInt(attrs.bopdCompetitiveness) || 0;
                $element.addClass('bopd-competitiveness').addClass('bopd-competitiveness-' + percent);
                $txt.text(percent + '%');
            }
        };
    });