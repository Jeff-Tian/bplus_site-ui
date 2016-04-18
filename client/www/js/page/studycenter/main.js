'use strict';

angular
    .module('bplus', [
        'bplusModule',
        'studyCenter',
        'trackingModule'
    ])
    .directive('bopdmenu', angular.bplus.leftColumnMenu)
    .controller('OpdMenuCtrl', ['$scope', function ($scope) {
        $scope.currentState = 'study-plan';
    }])
    .controller('StudyCtrl', ['$scope', function ($scope) {
        $scope.menus = [{
            text: '导师课程',
            href: '/study-center/teachercourse.html',
            icon: 'user',
            states: ['study-plan']
        }, {
            text: '我的课程',
            href: '/study-center/my#/course',
            icon: 'book',
            states: ['course']
        }, {
            text: '我的收藏',
            href: '/study-center/my#/fav',
            icon: 'bookmark',
            states: ['fav']
        }];
    }])
;