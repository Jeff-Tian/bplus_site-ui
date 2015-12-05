(function (exports) {
    var moduleTrack = new window.ModuleTrack('ranking');

    var DETAILS_RANKING_TITLE = [["名次", "学校", "平均名次"],
                                ["名次", "学校", "平均得分"],
                                ["名次", "学校", "晋级队伍数"],
                                ["名次", "学校", "总分"]];
    var RANK_AVERAGE_RANK = [];
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
    var RANK_AVERAGE_PROMOTION = [];
    var RANK_AVERAGE_TOTALSCORE = [];

    var DETAILS_OPTIONS = [RANK_AVERAGE_RANK, RANK_AVERAGE_SCORE, RANK_AVERAGE_PROMOTION, RANK_AVERAGE_TOTALSCORE];
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
        // [{rank:"名次", name:"学校", score:"342"},
        // {rank:"helo", name:"2", score:"342"},
        // {rank:"helo", name:"2", score:"342"},
        // {rank:"helo", name:"2", score:"342"}];

        $scope.rankChange = function(option) {
            $scope.option = option;
            $(".b-ranking-active").removeClass("b-ranking-active");
            $($(".b-ranking-options")[option]).addClass("b-ranking-active");
            $scope.details = refreshDetails(option);
        };
    };
    exports.RankingCtrl.$inject = ['$scope', 'service', 'queryParser'];
})(angular.bplus = angular.bplus || {});