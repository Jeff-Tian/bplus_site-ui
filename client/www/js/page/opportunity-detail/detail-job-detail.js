angular
    .module('opdModule')
    .filter('encodeURIComponent', function($window) {
        return $window.encodeURIComponent;
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('job/detail', {
            url: '/job/:jobid',
            templateUrl: 'job-detail.html',
            controller: 'detailJobDetail'
        });
    }])
    .directive('bopdjobdetail', function () {
        return {
            templateUrl: '/view-partial/opd/detail-job-detail.html',
            scope: true,
            link: function (scope, element, attrs) {
                scope.$element = angular.element(element);
            }
        };
    })
    .directive('favoriteJob', function () {
        return {
            link: function (scope, element, attrs) {
                var $element = angular.element(element);
                var id = attrs.favoriteJob;
                $element.on('click', function () {
                    if (!scope.hasFavorited) {
                        scope.hasFavorited = true;
                        scope.$apply();
                        window.alert('Favorite Job!');
                    }
                });
            }
        };
    })
    .directive('sendResume', function () {
        return {
            link: function (scope, element, attrs) {
                var $element = angular.element(element),
                    id = attrs.sendResume,
                    $modal;
                $element.on('click', function () {
                    if (!$element.hasClass('disabled')) {
                        if (!scope.hasSent) {
                            if (!$modal) {
                                $modal = $element.parents('html').find('.ui.modal.modal-send-resume').clone();
                                $modal.modal({
                                    onApprove : function() {
                                        scope.hasSent = true;
                                        scope.$apply();
                                        window.alert('Send Resume!');
                                    }
                                });
                            }
                            $modal.modal('show');
                        }
                    }
                });
            }
        };
    })
    .controller('detailJobDetail', ['$scope', '$stateParams', function ($scope, $stateParams) {
        var jobID = $stateParams.jobid;
        var hasLoggedIn = $scope.hasLoggedin();
        $scope.isSearching = true;
        var initPromises = [

        ];

        var jobDetailPromise = $scope.getJobDetail(jobID).then(function(){
            // debugger;
        });
        // var collectionPromise = 
        $scope.competitiveness = {
            progressRate: 80
        };

        $scope.chartPentagon = '4-2-3-2-2';

        $scope.hasFavorited = true;
        $scope.hasSent = false;

        /////
        // $scope.similarJobList = {
        //     NUMBER_PER_PAGE: 4,
        //     showPosition: true,
        //     showPageMenu: true,
        //     showPageMore: false,
        //     data: [{
        //         matchLevel: "a",
        //         progressRate: "50",
        //         position: {
        //             name: "a",
        //             type: "b",
        //             salary: "1111",
        //             certification: "c",
        //         },
        //         issueTime: "2015-12-12",
        //         company: "ksjksdf",
        //         status: "finished",     //finished, delivered
        //         statusText: "已有3家公司对你感兴趣!",
        //         companyinfo: {
        //             logo: "img/opd/match_e.png",
        //             name: "阿里巴巴",
        //             field: "移动互联网/中企",
        //             flag: "ad"   //ad, recommendation
        //         }
        //     }, {
        //         matchLevel: "d",
        //         progressRate: "70",
        //         position: {
        //             name: "c",
        //             type: "d",
        //             salary: "111122",
        //             certification: "d",
        //         },
        //         status: "",
        //         statusText: "已有3家公司对你感兴趣!",
        //         issueTime: "2015-12-20",
        //         company: "ksj ksdf",
        //         companyinfo: {
        //             logo: "img/opd/match_e.png",
        //             name: "阿里巴巴",
        //             field: "移动互联网/中企",
        //             flag: "recommendation"
        //         }
        //     }]
        // };
        // var originObject = $scope.similarJobList.data[0];
        // for (var i = 0; i < 13; i++) {
        //     $scope.similarJobList.data.push($.extend(true, {}, originObject, {progressRate: i}));
        // }
        /////

        $scope.trainingOpportunityList = {
            NUMBER_PER_PAGE: 4,
            data: [{
                name: "永苑艺术培训中心",
                description: "全清华北大名师",
                rate: 3,
                read: 190,
                field: "创意与设计领域",
                labels: [
                    "创意",
                    "思维",
                    "人文",
                    "创作"
                ],
                details: [{
                    pic: "/img/opd/ad.jpg",
                    title: "商业海报设计基础班 / 免费"
                }, {
                    pic: "/img/opd/ad.jpg",
                    title: "商业海报设计基础班 / $99.99"
                }],
                isRecommended: true,
                isAD: false,
            }, {
                name: "永苑艺术培训中心",
                description: "全清华北大名师",
                rate: 3,
                read: 190,
                field: "创意与设计领域",
                labels: [
                    "创意",
                    "思维",
                    "人文",
                    "创作"
                ],
                details: [{
                    pic: "/img/opd/ad.jpg",
                    title: "商业海报设计基础班 / 免费"
                }, {
                    pic: "/img/opd/ad.jpg",
                    title: "商业海报设计基础班 / $99.99"
                }, {
                    pic: "/img/opd/ad.jpg",
                    title: "设计基础班 / $39.99"
                }],
                isRecommended: false,
                isAD: true,
            }]
        };

        var originObject1 = $scope.trainingOpportunityList.data[0];
        for (var i = 0; i < 13; i++) {
            $scope.trainingOpportunityList.data.push($.extend(true, {}, originObject1));
        }
    }])
    .config(['ChartJsProvider', function (ChartJsProvider) {

        // Configure all charts
        ChartJsProvider.setOptions({
            colours: ['#000000', '#F53E3E'],
            responsive: true
        });
        // Configure all doughnut charts
        ChartJsProvider.setOptions('Doughnut', {
            animateScale: true
        });
    }])
    .controller('RadarCtrl', ['$scope', function ($scope) {

        $scope.labels = ["数据分析", "团队合作", "战略思维", "商业洞察", "快速学习"];

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
    }])
    .controller('LineCtrl', ['$scope', function ($scope) {

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
    }])
;