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

    exports.RankingCtrl = function ($scope, service, queryParser, WechatWrapper) {
        $scope.option = OPTION_INIT;
        $scope.details = refreshDetails($scope.option);
        $scope.rankChange = function(option) {
            $scope.option = option;
            $scope.details = refreshDetails(option);
        };

        $('.rank-wechat-share').popup({
            on: 'hover',
        });
        service.post(angular.bplus.config.serviceUrls.wechatJsApiConfig, {
            url: window.location.origin + window.location.pathname
        }).then(function (result) {
            var jsApiList = [
                'onMenuShareAppMessage',
                'onMenuShareTimeline'
            ];

            WechatWrapper.config({
                debug: false,
                appId: result.appId,
                timestamp: String(result.timestamp),
                nonceStr: String(result.noncestr),
                signature: result.signature,
                jsApiList: jsApiList
            });

            WechatWrapper.ready(function () {
                WechatWrapper.checkJsApi({
                    jsApiList: jsApiList,
                    success: function (res) {
                        var imageUrl = angular.bplus.config.cdn.normal + 'img/wechat/for_share.png?' + angular.bplus.config.cdn.version;
                        if (imageUrl.indexOf('//') === 0) {
                            imageUrl = 'http:' + imageUrl;
                        } else {
                            imageUrl = location.origin + imageUrl;
                        }

                        WechatWrapper.onMenuShareAppMessage({
                            title: $rootScope.pageTitle,
                            desc: $rootScope.pageDescription,
                            link: location.href,
                            imgUrl: imageUrl,
                            trigger: function (res) {
                                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                                //alert('用户点击发送给朋友');
                            },
                            success: function (res) {
                                //alert('已分享');
                            },
                            cancel: function (res) {
                                //alert('已取消');
                            },
                            fail: function (res) {
                                //alert(JSON.stringify(res));
                            }
                        });

                        WechatWrapper.onMenuShareTimeline({
                            title: $rootScope.pageTitle,
                            link: location.href,
                            imageUrl: imageUrl
                        });
                    }
                });
            });
        });
    };
    exports.RankingCtrl.$inject = ['$scope', 'service', 'queryParser', 'WechatWrapper'];
})(angular.bplus = angular.bplus || {});