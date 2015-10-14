define([
    "angular"
], function (angular) {
    var SERVICE_MEMBER = "memberExt";
    var bgBanner = [
        'img/profile/banner.1.jpg',
        'img/profile/banner.2.jpg',
        'img/profile/banner.3.jpg'
    ];
    var createImageUrl = function (imagePath) {
        return angular.bplus.config.cdn.normal + imagePath + "?" + angular.bplus.config.cdn.version;
    };

    return function (agModule) {
        agModule.controller('banner', ['$scope', 'personalinfoService', function ($scope, model) {
            model.getData(SERVICE_MEMBER).then(function (data) {
                var memberData = data[0];
                var imagePath = memberData.userBackground ? memberData.userBackground : bgBanner[0];
                $scope.imageBanner = createImageUrl(imagePath);
                $scope.hoverBtn = '';

            });
            $scope.switchBanner = function (i) {
                var imagePath = bgBanner[i];
                $scope.imageBanner = createImageUrl(imagePath);
                model.updateData(SERVICE_MEMBER, {
                    userBackground: imagePath
                });
            };
        }]);
    };
});