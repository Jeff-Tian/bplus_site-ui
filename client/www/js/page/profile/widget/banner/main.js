define([

], function (

) {
    return function (agModule) {
        agModule.controller('banner', ['$scope', function ($scope) {
            $scope.imageBanner = '/img/profile/XXX.jpg';
            $scope.hoverBtn = '';
        }]);
    };
});