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
            }],
            messages: [{
                text: '钱老师您好,我很喜欢您提到创业的梦想与现实 这一个部分,我现在也面临了是否要考研还是就 业的选择,不知道老师有没有什麽想法?',
                from: 'me'
            }, {
                text: '聊聊你现在对于创业的想法吧!',
                from: 'teacher'
            }, {
                text: '人一生中要扮演很多角色,如何积累其中的专业性呢?在商业\
                性很强的职业上,我们有很多机会去培训练习和积累,也会有\
                    同事的指导和帮助。很多都是一次性的角色,经历过了会有很\
        多好的经验和感受,但时间过去了就浪费了,而新演员又要重\
        新摸索一次。如何有一个工具可以改善一次性角色的专业性?',
                from: 'me'
            }, {
                text: '建议你听听看Julia导师开的课 : )',
                from: 'teacher'
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