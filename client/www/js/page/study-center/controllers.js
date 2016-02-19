angular.module('studyCenterModule')
    .controller('UnfinishedCoursesCtrl', ['$scope', function ($scope) {
        $scope.courses = [{
            name: '咨询公司求职,如何修改简历?',
            teacher: 'Julia合得国际创始人,HBS Alumni',
            startDate: '2016年1月26日(周四)',
            startTime: '20:00',
            endTime: '21:00',
            status: '30'
        }, {
            name: '咨询公司求职,如何修改简历?',
            teacher: 'Julia合得国际创始人,HBS Alumni',
            startDate: '2016年1月26日(周四)',
            startTime: '20:00',
            endTime: '21:00',
            status: '40'
        }, {
            name: '咨询公司求职,如何修改简历?',
            teacher: 'Julia合得国际创始人,HBS Alumni',
            startDate: '2016年1月26日(周四)',
            startTime: '20:00',
            endTime: '21:00',
            status: '100'
        }];

        $scope.showDimmer = function ($event) {
            $($event.target).closest('.dimmable').dimmer('show');
        };

        $scope.hideDimmer = function ($event) {
            $($event.currentTarget).dimmer('hide');
        };
    }])
    .controller('FinishedCoursesCtrl', ['$scope', function ($scope) {

        $scope.courses = [{
            name: '咨询公司求职,如何修改简历?',
            teacher: 'Julia合得国际创始人,HBS Alumni',
            startDate: '2016年1月26日(周四)',
            startTime: '20:00',
            endTime: '21:00',
            status: '30'
        }, {
            name: '咨询公司求职,如何修改简历?',
            teacher: 'Julia合得国际创始人,HBS Alumni',
            startDate: '2016年1月26日(周四)',
            startTime: '20:00',
            endTime: '21:00',
            status: '40'
        }, {
            name: '咨询公司求职,如何修改简历?',
            teacher: 'Julia合得国际创始人,HBS Alumni',
            startDate: '2016年1月26日(周四)',
            startTime: '20:00',
            endTime: '21:00',
            status: '100'
        }];
    }])
    .controller('FavTeachersCtrl', ['$scope', function ($scope) {
        $scope.teachers = [{
            name: '钱申',
            description: '10年再线教育经验,港大MBA,复旦计算机硕士',
            title: '合得国际CTO',
            image: 'img/feedback/about-team-1.jpg',
            topics: [{
                title: '投行面试辅导',
                link: 'http://www.baidu.com',
                target: '_blank'
            }, {
                title: '如何做好电话销售',
                link: 'http://www.bing.com',
                target: '_blank'
            }, {
                title: '如何做好电话销售',
                link: 'http://www.google.com',
                target: '_blank'
            }]
        }, {
            name: '钱申',
            description: '10年再线教育经验,港大MBA,复旦计算机硕士',
            title: '合得国际CTO',
            image: 'img/feedback/about-team-1.jpg',
            topics: [{
                title: '投行面试辅导投行面试辅导投行面试辅导投行面试辅导投行面试辅导投行面试辅导投行面试辅导',
                link: 'http://www.baidu.com',
                target: '_blank'
            }, {
                title: '如何做好电话销售',
                link: 'http://www.bing.com',
                target: '_blank'
            }, {
                title: '如何做好电话销售',
                link: 'http://www.google.com',
                target: '_blank'
            }]
        }, {
            name: '钱申',
            description: '10年再线教育经验,港大MBA,复旦计算机硕士',
            title: '合得国际CTO',
            image: 'img/feedback/about-team-1.jpg',
            topics: [{
                title: '投行面试辅导',
                link: 'http://www.baidu.com',
                target: '_blank'
            }, {
                title: '如何做好电话销售',
                link: 'http://www.bing.com',
                target: '_blank'
            }, {
                title: '如何做好电话销售',
                link: 'http://www.google.com',
                target: '_blank'
            }]
        }];
    }])
;