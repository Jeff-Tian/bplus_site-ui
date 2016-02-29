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
        var initPromises = [
        ];

        var jobDetailPromise = $scope.getJobDetail(jobID).then(function(positionData){
            $scope.jobData = positionData;
            //Description can be htmp template
            $templateCache.put('jobDescription.html', positionData.positionAdditional.description);
            $scope.getCompanyDetail(positionData.companyinfo.id).then(function(companyData){
                $scope.companyData = companyData;
                console.log("positionData", positionData);
                console.log("companyData", companyData);
                $scope.isSearching = false;
            }) ;
        });
        $scope.hasFavorited = true;
        $scope.hasSent = false;
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

        // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        // $scope.series = ['Series A', 'Series B'];
        // $scope.data = [
        //     [65, 59, 80, 81, 56, 55, 40],
        //     [28, 48, 40, 19, 86, 27, 90]
        // ];
        // $scope.onClick = function (points, evt) {
        //     console.log(points, evt);
        // };
    }])
;