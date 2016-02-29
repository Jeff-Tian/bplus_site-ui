angular
    .module('opdModule')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('job/corporation', {
            url: '/job/corporation/:corporationid',
            templateUrl: 'job-corporation.html',
            controller: 'detailJobCorporation'
        }).state('job/corporation-recruit', {
            url: '/job/corporation/:corporationid-recruit',
            templateUrl: 'job-corporation.html',
            controller: 'detailJobCorporation'
        });
    }])
    .directive('bopdjobcorporation', function () {
        return {
            templateUrl: '/view-partial/opd/detail-job-corporation.html',
            link: function (scope, element, attrs) {
                scope.$element = angular.element(element);
            }
        };
    })
    .directive('introJobs', function () {
        return {
            link: function (scope, element, arrts) {
                var $item = angular.element(element).find('.menu .item');
                $item.tab();
                if (scope.isRecruit) {
                    $item.eq(1).trigger('click');
                }
            }
        };
    })
    .directive('favoriteCorporation', function () {
        return {
            link: function (scope, element, attrs) {
                var $element = angular.element(element);
                var id = attrs.favoriteCorporation;
                $element.on('click', function () {
                    if (!scope.hasFavorited) {
                        scope.hasFavorited = true;
                        window.alert('Favorite Corporation!');
                    }
                });
            }
        };
    })
    .controller('detailJobCorporation', ['$scope', '$window', function ($scope, $window) {

        $scope.chartPentagon = '4-2-3-2-2';

        $scope.isRecruit = /-recruit$/.test($window.location.hash);

        $scope.hasFavorited = false;

        $scope.recruitFilter = [{
            key: 'recruitKey',
            label: '职位：',
            list: [{
                id: 0,
                text: '全部'
            }, {
                id: 1,
                text: '市场'
            }, {
                id: 2,
                text: '销售'
            }, {
                id: 3,
                text: '公关'
            }, {
                id: 4,
                text: '技术'
            }, {
                id: 5,
                text: '设计'
            }, {
                id: 6,
                text: '人事'
            }, {
                id: 7,
                text: '仓管'
            }, {
                id: 8,
                text: '行政'
            }, {
                id: 9,
                text: '文书'
            }]
        }];

        $scope.recruitFilterSetting = {
            showThumb: false,
            showDetail: true,
            hasThumbView: false,
            inline: true,
            recruitKey: {
                id: 0,
                text: '全部'
            }
        };

        $scope.recruitList = {
            NUMBER_PER_PAGE: 3,
            showPosition: false,
            showPageMenu: true,
            showPageMore: false,
            data: [{
                matchLevel: "a",
                progressRate: "50",
                position: {
                    name: "产品经理",
                    type: "兼职",
                    salary: "9k-16k",
                    certification: "学历不限",
                },
                issueTime: "2015-12-12",
                company: "苹果",
                status: "finished",     //finished, delivered
                statusText: "",
                companyinfo: {
                }
            },{
                matchLevel: "d",
                progressRate: "70",
                position: {
                    name: "c",
                    type: "d",
                    salary: "111122",
                    certification: "d",
                },
                status: "",
                statusText: "已有7家公司对你感兴趣!",
                issueTime: "2015-12-20",
                company: "ksj ksdf",
                companyinfo: {
                }
            }]
        };

    }])
    .controller('RadarCtrlCorporation', ['$scope', function ($scope) {

        $scope.labels = ["薪酬福利", "公司环境", "团队气氛", "未来潜力", "升迁制度"];

        $scope.data = [
            [50, 45, 70, 40, 30]
        ];

        $scope.colors = [
            '#F53E3E'
        ];

        $scope.options = {
            pointDot: false,
            scaleShowLine: true,
            scaleOverride: true,
            scaleSteps: 10,
            scaleStepWidth: 10,
            scaleStartValue: 0,
            angleLineColor : "rgba(0,0,0,.5)",
            datasetStroke: false,
            datasetStrokeWidth: 0
        };
    }]);