angular.module('studyCenterModule', ['bplusModule', 'ui.router'])
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
    .run(['$rootScope', '$state', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            angular.element('head title').text(toState.data.pageTitle);
        });
    }])
    .directive('bopdmenu', angular.bplus.leftColumnMenu)
    .directive('bopdcompetitiveness', angular.bplus.bopdcompetitiveness)
    .controller('OpdMenuCtrl', angular.bplus.OpdMenuCtrl)
    .controller('StudyCtrl', ['$scope', function ($scope) {
        $scope.menus = [{
            text: '导师课程',
            href: '/zh/studycenter/teachercourse.html',
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