define([

], function (

) {
    return function (agModule) {
        agModule.controller('growing', ['$scope', function ($scope) {
            $scope.list = [{
                title: '第一届Bridge+全国商业实战大赛 华东赛区 特等奖'
            }, {
                title: '第二届Bridge+全国商业实战大赛 复赛 优胜奖'
            }, {
                title: '第二届Bridge+全国商业实战大赛 决赛 第一名'
            }];
            $scope.buttons = [{
                title: '查看历次比赛成绩'
            }, {
                title: '下载比赛结果报告'
            }, {
                title: '下载比赛获奖证书'
            }];
        }]);
    }
});