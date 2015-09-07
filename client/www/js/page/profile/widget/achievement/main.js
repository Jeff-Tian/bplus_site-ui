define([

], function (

) {
    return function (agModule) {
        agModule.controller('achievement', ['$scope', function ($scope) {
            $scope.face = '/img/profile/icon_profile_picture_male_big.png';
            $scope.pics = [
                {image: '/img/profile/achievement-img.jpg'},
                {image: '/img/profile/achievement-img.jpg'},
                {image: '/img/profile/achievement-img.jpg'},
                {image: '/img/profile/achievement-img.jpg'},
                {image: '/img/profile/achievement-img.jpg'}
            ];
            $scope.level = '9';
            $scope.scroe = 99;
            $scope.list = [{
                title: '分享信息到朋友圈',
                scroe: '+3'
            }, {
                title: '邀请朋友加入',
                scroe: '+5'
            }, {
                title: '注册成功',
                scroe: '+5'
            }];
        }]);
    }
});