'use strict';

angular
    .module('bplus', [
        'bplusModule',
        'studyCenter',
        'trackingModule'
    ])
    .directive('bopdmenu', angular.bplus.leftColumnMenu)
    .controller('OpdMenuCtrl', ['$scope', function ($scope) {
        if (window.location.pathname.match(/\/study-center\/teachercourse\.html/i)) {
            $scope.currentState = 'study-plan';
        }

        if (window.location.pathname.match(/\/study-center\/?$/i)) {
            $scope.currentState = 'study-plan';
        }

        if (window.location.pathname.match(/\/study-center\/teacherbook\.html/i)) {
            $scope.currentState = 'study-teacher-book';
        }
    }])
    .controller('StudyCtrl', ['$scope', function ($scope) {
        $scope.menus = [{
            text: '导师课程',
            href: '/study-center/teachercourse.html',
            icon: 'user',
            states: ['study-plan']
        }, {
            text: '导师特约课程',
            href: '/study-center/teacherbook.html',
            icon: 'user',
            states: ['study-teacher-book']
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