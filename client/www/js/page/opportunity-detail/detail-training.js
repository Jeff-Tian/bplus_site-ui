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

            $scope.settingData = {
                sorting: 0,
                filter: 0
            };

            $scope.settings = [{
                name: 'sorting',
                key: '排序方式：',
                list: [{
                    id: 0,
                    text: '默认'
                }, {
                    id: 1,
                    text: '最新'
                }, {
                    id: 2,
                    text: '推荐星级'
                }, {
                    id: 3,
                    text: '热门'
                }]
            }, {
                name: 'filter',
                key: '机构专长：',
                list: [{
                    id: 0,
                    text: '不限'
                }, {
                    id: 1,
                    text: '语言'
                }, {
                    id: 2,
                    text: 'IT'
                }, {
                    id: 3,
                    text: '留学'
                }]
            }];
        }
    };
});