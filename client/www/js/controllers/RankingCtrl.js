(function (exports) {
    var moduleTrack = new window.ModuleTrack('ranking');

    var DETAILS_RANKING_TITLE = [["名次", "学校", "平均名次"],
                                ["名次", "学校", "平均得分"],
                                ["名次", "个人", "个人总分"]];
    var RANK_AVERAGE_RANK = [["1", "浙江财经大学", "2.25"],
                            ["2", "中山大学", "2.50"],
                            ["3", "东北财经大学", "2.81"],
                            ["4", "西南财经大学", "2.90"],
                            ["5", "复旦大学", "2.93"],
                            ["6", "山东财经大学", "3.13"],
                            ["7", "广东财经大学", "3.15"],
                            ["8", "同济大学", "3.32"],
                            ["9", "吉林大学", "3.41"],
                            ["10", "对外经济贸易大学", "3.41"]];
    var RANK_AVERAGE_SCORE = [["1", "西南财经大学", "56.59"],
                            ["2", "复旦大学", "51.40"],
                            ["3", "中山大学", "48.89"],
                            ["4", "东北财经大学", "47.45"],
                            ["5", "对外经济贸易大学", "44.42"],
                            ["6", "长春理工大学", "42.10"],
                            ["7", "吉林大学", "41.64"],
                            ["8", "同济大学", "39.96"],
                            ["9", "山东财经大学", "39.37"],
                            ["10", "浙江财经大学", "36.70"]];
    var RANK_TOTAL_SCORE = [["1", "佟文钊（中国人民大学）", "171.41"],
                                ["1", "李朋浩（中国人民大学）", "171.41"],
                                ["1", "林鹤仪（中国人民大学）", "171.41"],
                                ["1", "道日那（中国人民大学）", "171.41"],
                                ["1", "王梓麒（中国人民大学）", "171.41"],
                                ["6", "徐子云（复旦大学）", "145.43"],
                                ["6", "项昊天（复旦大学）", "145.43"],
                                ["6", "林子傑（复旦大学）", "145.43"],
                                ["6", "张文萱（复旦大学）", "145.43"],
                                ["6", "金旭磊（复旦大学）", "145.43"]];
    var DETAILS_OPTIONS = [RANK_AVERAGE_RANK, RANK_AVERAGE_SCORE, RANK_TOTAL_SCORE];
    var OPTION_INIT = 0;

    var createSingleDetailObject = function(sourceAry) {
        return {"rank": sourceAry[0], "name": sourceAry[1], "score": sourceAry[2]};
    };

    var refreshDetails = function(option) {
        var retArray = [];
        retArray.push(createSingleDetailObject(DETAILS_RANKING_TITLE[option]));
        var resultList = DETAILS_OPTIONS[option];
        resultList.forEach(function(value) {
            retArray.push(createSingleDetailObject(value));
        });

        return retArray;
    };

    exports.RankingCtrl = function ($scope, service, queryParser) {
        $scope.option = OPTION_INIT;
        $scope.details = refreshDetails($scope.option);
        $scope.rankChange = function(option) {
            $scope.option = option;
            $scope.details = refreshDetails(option);
        };
    };
    exports.RankingCtrl.$inject = ['$scope', 'service', 'queryParser'];
})(angular.bplus = angular.bplus || {});