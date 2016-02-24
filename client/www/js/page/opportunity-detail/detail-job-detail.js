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
    .controller('detailJobDetail', ['$scope', '$stateParams', '$templateCache', function ($scope, $stateParams, $templateCache) {
        var jobID = $stateParams.jobid;
        var hasLoggedin = false;
        $scope.hasLoggedin = hasLoggedIn = $scope.hasLoggedin();
        $scope.isSearching = true;
        var jobDescriptionTemplate = '<div class="responsibilities">'+
            '<span class="title">工作职责：</span>'+
            '<ul class="ui ordered list">'+
            '    <li class="item">不断地从用户的角度来进行网站产品的创新，提升网站整体可用性。</li>'+
            '    <li class="item">负责网站产品用户体验评估工作，参与网站产品交互界面设计，分析影响网站产品用户体验的因素。</li>'+
            '    <li class="item">定期开展网站用户测试，观察用户使用网站产品的情况，评估可用性水平，并协调相关合作团队及时提升网站产品体验。</li>'+
            '    <li class="item">收集和采集客户对于网站产品使用的反馈，借助适当的技术提升客户体验。</li>'+
            '</ul>'+
        '</div>'+
        '<div class="qualifications">'+
        '    <div class="title">任职资格：</div>'+
        '    <div class="tags">'+
        '        <div class="ui label">硕士</div>'+
        '        <div class="ui label">1-2年工作经验</div>'+
        '        <div class="ui label">英文</div>'+
        '        <div class="ui label">女</div>'+
        '        <div class="ui label">25 岁以上</div>'+
        '    </div>'+
        '    <ul class="ui ordered list">'+
        '        <li class="item">人机交互、心理学、社会学等相关专业毕业优先。</li>'+
        '        <li class="item">有互联网从业经验，从事2年以上的用户体验研究与设计工作经验。</li>'+
        '        <li class="item">熟练掌握和运用用户体验研究的相关工具和方法，对用研相关的上下游岗位有较深刻的理解。</li>'+
        '        <li class="item">设计用户行为及产品的信息构架，保证产品的可用性。</li>'+
        '        <li class="item">参与互联网产品的规划构思，归纳用户目标、用户任务。</li>'+
        '        <li class="item">参与用户研究，根据用户研究的结果对设计方案进行优化。</li>'+
        '        <li class="item">对现有产品的可用性测试和评估提出改进方案，持续优化产品的用户体验。</li>'+
        '        <li class="item">对互联网行业及移动互联网产品有强烈兴趣和系统的用户研究实践。</li>'+
        '        <li class="item">良好的沟通、表达能力（包括口头和书面）、分析能力，优秀的洞察力及推进事情的能力，积极乐观，严谨治学，具备跨团队的协作能力。</li>'+
        '    </ul>'+
        '</div>';
        $templateCache.put('jobDescription.html', jobDescriptionTemplate)
        var initPromises = [

    ]

        var jobDetailPromise = $scope.getJobDetail(jobID).then(function(data){
            $scope.jodData = {
                // levelMatching: data.
            };
            $scope.isSearching = false;
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
        for (i = 0; i < 13; i++) {
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