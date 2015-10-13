define([

], function (

) {
    return function (agModule) {
        agModule.controller('banner', ['$scope', function ($scope) {
            var bgBanner = [
                '/img/profile/banner.1.jpg',
                '/img/profile/banner.2.jpg',
                '/img/profile/banner.3.jpg'
            ];
            $scope.imageBanner = bgBanner[0];
            $scope.hoverBtn = '';
            $scope.switchBanner = function (i) {
                $scope.imageBanner = bgBanner[i];
            };
        }]);
    };
});