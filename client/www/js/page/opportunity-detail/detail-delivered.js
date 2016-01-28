angular.module('opdModule').directive('bopddelivered', function() {
        return {
            restrict: "E",
            scope: {
                src: '='
            },
            templateUrl: '/view-partial/opd/detail-delivered.html',
            link: function($scope, element, attrs) {
                $scope.data = {};
                $scope.data.positions = {
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
                var originObject = $scope.data.positions.data[0];
                for (var i = 0; i < 3; i++) {
                    $scope.data.positions.data.push($.extend(true, {}, originObject, {progressRate: i}));
                }
            }
        };
    });