angular.module('studyCenterModule', ['bplusModule', 'ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var states = ['study-plan', 'fav', 'course'];

        $urlRouterProvider.otherwise('/' + states[0]);

        for (var i = 0; i < states.length; i++) {
            var state = states[i];

            $stateProvider
                .state(state, {
                    url: '/' + state,
                    templateUrl: state + '.html'
                });
        }
    }])
    .directive('bopdmenu', angular.bplus.leftColumnMenu)
    .directive('bopdcompetitiveness', angular.bplus.bopdcompetitiveness)
    .controller('OpdMenuCtrl', angular.bplus.OpdMenuCtrl)
    .controller('StudyCtrl', ['$scope', function ($scope) {
        $scope.menus = [{
            text: '我的学习计划',
            href: '#/study-plan',
            icon: 'file text outline',
            states: ['study-plan']
        }, {
            text: '我的收藏',
            href: '#/fav',
            icon: 'bookmark',
            states: ['fav']
        }, {
            text: '我的课程',
            href: '#/course',
            icon: 'book',
            states: ['course']
        }];
    }])
;