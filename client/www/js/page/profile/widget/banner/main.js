define([

], function (

) {
    return function (agModule) {
        agModule.controller('banner', ['$scope', function ($scope) {
            $scope.imageBanner = '/img/profile/banner.1.jpg';
            $scope.hoverBtn = '';
        }]);
    };
});