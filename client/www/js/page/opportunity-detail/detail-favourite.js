angular.module('opdModule').directive('bopdfavourite', ['$q', function ($q) {
    return {
        restrict: "E",
        scope: true,
        templateUrl: '/view-partial/opd/detail-favourite.html',
        link: function ($scope, element, attrs) {
            var FIRST_PAGE = 1;
            var positionData = [];
            var companyData = [];
            $scope.isSearching = true;
            var search = function() {
                $scope.isSearching = true;
                return $scope.getFavoritePositions(
                    ).then(function(ret){
                        positionData = ret.jobs;
                        companyData = ret.company;
                        $scope.positions.totalPage = positionData.length;
                        $scope.companies.totalPage = companyData.length;
                        $scope.positions.data = positionData;
                        $scope.companies.data = companyData;
                        $scope.isSearching = false;
                });
            };
            $scope.positions = {
                NUMBER_PER_PAGE: 10,
                showPosition: true,
                showPageMenu: true,
                showPageMore: false,
                deleteable: "true",
                delete: function(target) {
                    return $scope.removeFavoritePosition(target.jobID, true).then(function() {
                        return search();
                    });
                },
                getData: function (currentPage) {
                    $scope.positions.data = [];
                    positionData.forEach(function(value) {
                        $scope.positions.data.push(value);
                    });
                    $scope.positions.currentPage = currentPage;
                    var deferred = $q.defer();
                    deferred.resolve($scope.positions.data);
                    return deferred.promise;
                },
                totalPage: 1,
                currentPage: FIRST_PAGE,
                data: []
            };

            $scope.companies = {
                NUMBER_PER_PAGE: 10,
                totalPage: 1,
                currentPage: FIRST_PAGE,
                getData: function (currentPage) {
                    $scope.companies.data = [];
                    companyData.forEach(function(value) {
                        $scope.companies.data.push(value);
                    });
                    $scope.companies.currentPage = currentPage;
                    var deferred = $q.defer();
                    deferred.resolve($scope.companies);
                    return deferred.promise;
                },
                data: [{
                    matchLevel: "a",
                    companyinfo: {
                        logo: "img/opd/match_e.png",
                        name: "阿里巴巴",
                        field: "移动互联网/中企",
                        flag: "latest"   //ad, recommendation, latest
                    },
                    positioninfo: {
                        onboard: 100,
                        newposition: 2,
                        issueTime: "2015-12-20",
                    }
                }, {
                    matchLevel: "d",
                    companyinfo: {
                        logo: "img/opd/match_e.png",
                        name: "阿里巴巴",
                        field: "移动互联网/中企",
                        flag: "recommendation"
                    },
                    positioninfo: {
                        onboard: 14,
                        newposition: 0,
                        issueTime: "2015-12-22",
                    }
                }]
            };

            // $scope.data.positions.page = "empty";
            originObject = $scope.companies.data[0];

            for (i = 0; i < 3; i++) {
                $scope.companies.data.push($.extend(true, {}, originObject));
            }
            ///////////////////////////////////////
            search();
            $(".b-opd-favorite .menu .item").tab();
        }
    };
}]);