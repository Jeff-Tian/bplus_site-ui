angular.module('opdModule').directive('bopdfavourite', function () {
    return {
        restrict: "E",
        scope: true,
        templateUrl: '/view-partial/opd/detail-favourite.html',
        link: function ($scope, element, attrs) {
            var FIRST_PAGE = 1;
            var search = function(currentPage) {
                $scope.isSearching = true;
                return $scope.getPositions(
                        $scope.searchOptions.searchKeyWord,
                        $scope.searchOptions.conditions,
                        $scope.searchList.NUMBER_PER_PAGE, 
                        currentPage ? currentPage : FIRST_PAGE,
                        $scope.STATIC_PARAMS.POSITION_SOURCE.SEARCH,
                        $scope.sortingAndFilterSetting.sorting.value
                    ).then(function(ret){
                        $scope.searchList.currentPage = currentPage;
                        $scope.searchList.data = new Array(ret.total);
                        for (var i = 0; i < ret.total; i++) {
                            $scope.searchList.data[i] = {};
                        }
                        ret.jobs.forEach(function(value, index){
                            $scope.searchList.data[(ret.currentPage - 1)*$scope.searchList.NUMBER_PER_PAGE+index] = value;
                        });
                        $scope.searchList.totalPage = ret.total;
                        $scope.searchList.page = $scope.hasLoggedin() ? (ret.total > 0 ? "data" : "empty") : "logout";
                        $scope.isSearching = false;
                });
            };
            $scope.data = {};
            $scope.data.positions = {
                NUMBER_PER_PAGE: 10,
                showPosition: true,
                showPageMenu: true,
                showPageMore: false,
                deleteable: "false",
                getData: search,
                totalPage: 1,
                currentPage: FIRST_PAGE,
                data: [{
                    matchLevel: "a",
                    progressRate: "50",
                    position: {
                        name: "a",
                        type: "b",
                        salary: "1111",
                        certification: "c",
                    },
                    issueTime: "2015-12-12",
                    company: "ksjksdf",
                    status: "finished",     //finished, delivered
                    statusText: "已有3家公司对你感兴趣!",
                    companyinfo: {
                        logo: "img/opd/match_e.png",
                        name: "阿里巴巴",
                        field: "移动互联网/中企",
                        flag: "latest"   //ad, recommendation, latest
                    }
                }, {
                    matchLevel: "d",
                    progressRate: "70",
                    position: {
                        name: "c",
                        type: "d",
                        salary: "111122",
                        certification: "d",
                    },
                    status: "",
                    statusText: "已有3家公司对你感兴趣!",
                    issueTime: "2015-12-20",
                    company: "ksj ksdf",
                    companyinfo: {
                        logo: "img/opd/match_e.png",
                        name: "阿里巴巴",
                        field: "移动互联网/中企",
                        flag: "recommendation"
                    }
                }]
            };

            $scope.data.companies = {
                NUMBER_PER_PAGE: 10,
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
            originObject = $scope.data.companies.data[0];

            for (i = 0; i < 3; i++) {
                $scope.data.companies.data.push($.extend(true, {}, originObject));
            }
            ///////////////////////////////////////
            $(".b-opd-favorite .menu .item").tab();
        }
    };
});