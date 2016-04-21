angular.module('studyCenterModule', ['bplusModule', 'ui.router', 'trackingModule'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var states = [
            {
                url: 'fav',
                data: {
                    pageTitle: '我的收藏 - Bridge+'
                }
            },
            {
                url: 'course',
                data: {
                    pageTitle: '我的课程 - Bridge+'
                }
            }
        ];

        $urlRouterProvider.otherwise('/' + states[0].url);

        for (var i = 0; i < states.length; i++) {
            var state = states[i];

            $stateProvider
                .state(state.url, {
                    url: '/' + state.url,
                    templateUrl: state.url + '.html',
                    data: state.data
                });
        }
    }])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            angular.element('head title').text(toState.data.pageTitle);
        });
    }])
    .controller('MyCoursesCtrl', ['tracking', 'url', function (tracking, url) {
        var l = url.parse(document.referrer);

        if (l.pathname.match(/\/study-center\/teacher\.html/i)) {
            tracking.send('studyCenterMentorDetail.myCourses.click');
        } else if (l.pathname.match(/\/study-center\/teachercourse.html/i)) {
            tracking.send('studyCenterMentorCourses.myCourses.click');
        }
    }])
    .directive('bopdmenu', angular.bplus.leftColumnMenu)
    .directive('bopdcompetitiveness', angular.bplus.bopdcompetitiveness)
    .controller('OpdMenuCtrl', angular.bplus.OpdMenuCtrl)
    .controller('StudyCtrl', ['$scope', function ($scope) {
        $scope.menus = [{
            text: '导师课程',
            href: '/study-center/teachercourse.html',
            icon: 'user',
            states: ['study-plan']
        }, {
            text: '我的课程',
            href: '#/course',
            icon: 'book',
            states: ['course']
        }, {
            text: '我的收藏',
            href: '#/fav',
            icon: 'bookmark',
            states: ['fav']
        }];
    }])
;