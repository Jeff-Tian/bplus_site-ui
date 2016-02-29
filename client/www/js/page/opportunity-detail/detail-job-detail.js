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
    .controller('detailJobDetail', ['$scope', '$stateParams', '$templateCache', '$q', function ($scope, $stateParams, $templateCache, $q) {
        var jobID = $stateParams.jobid;
        var hasLoggedin = false;
        $scope.isLoggedin = hasLoggedin = $scope.hasLoggedin();
        $scope.isSearching = true;

        $scope.getJobDetail(jobID).then(function(positionData){
            $scope.jobData = positionData;
            //Description can be html template
            $templateCache.put('jobDescription.html', positionData.positionAdditional.description);
            var initPromises = [
                $scope.getCompanyDetail(positionData.companyinfo.id)
            ];
            if (hasLoggedin) {
                initPromises.push($scope.checkFavorite(jobID, true));
                initPromises.push($scope.checkDelivered(jobID));
            }
            $q.all(initPromises).then(function(ret){
                var companyData = ret[0];
                var hasCollected = ret[1];
                var hasDelivered = ret[2];
                $scope.companyData = companyData;
                $scope.hasCollected = hasCollected;
                $scope.hasSent = hasDelivered;
                $scope.onCollectClick = function(){
                    return $scope.saveFavoritePosition(jobID, true).then(function(ret){
                        debugger;
                        $scope.hasCollected = ret;
                    });
                };
                $scope.onApplyClick = function(){
                    $('.ui.modal.modal-send-resume').modal("show");
                };
                $scope.isSearching = false;
                $('.ui.modal.modal-send-resume').modal({
                    onApprove: function(){
                        return $scope.deliveredPosition(jobID).then(function(ret){
                            $scope.hasSent = ret;
                        });
                    }
                });
            });
        });
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
        var dataObject = $scope.jobData.positionAdditional.evaluation;
        dataObject = {
            "数据分析": 45,
            "团队合作": 90,
            "战略思维": 65,
        }
        var keys = Object.keys(dataObject);
        var values = [];
        keys.forEach(function(key){
            values.push(dataObject[key]);
        });
        debugger;
        $scope.labels = keys;

        $scope.data = values;

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