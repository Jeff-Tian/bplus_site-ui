angular.module('opdModule').directive('bopdtraining', function () {
    return {
        restrict: "E",
        scope: {
            src: '='
        },
        templateUrl: '/view-partial/opd/detail-training.html',
        link: function ($scope, element, attrs) {
            $('.shape').shape();
            $('.ui.left.arrow.icon').on('click', function () {
                $(this).closest('.ui.image').find('.shape').shape('flip left');
            });
            $('.ui.right.arrow.icon').on('click', function () {
                $(this).closest('.ui.image').find('.shape').shape('flip right');
            });
        }
    };
});