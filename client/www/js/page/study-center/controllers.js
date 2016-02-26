angular.module('studyCenterModule')
    .controller('UnfinishedCoursesCtrl', ['$scope', '$timeout', '$q', 'service', function ($scope, $timeout, $q, service) {
        $scope.loading = false;

        $scope.courses = {
            rawData: []
        };

        service.executePromiseAvoidDuplicate($scope, 'loading', function () {
            return service.get(angular.bplus.config.serviceUrls.studyCenter.classBooking.coming)
                .then(function (data) {
                    $scope.courses.rawData =
                        data.map(function (d) {
                            return {
                                name: d.description,
                                teacher: d.teacher.display_name,
                                status: (18 / 20) * 100,
                                statusText: ['18/20', '已开课'],
                                startAt: new Date(d.start_time),
                                endAt: new Date(d.end_time),
                                tags: d.teacher.tags.map(function (t) {
                                    return {
                                        text: t,
                                        special: false
                                    };
                                })
                            };
                        });

                    angular.forEach($scope.courses.rawData, function (value, key) {
                        value.countdown = new CountDown(new Date(value.startAt));
                    });

                    $scope.courses.getData = function () {
                        var deferred = $q.defer();

                        $scope.loading = true;
                        $timeout(function () {
                            $scope.loading = false;
                            deferred.resolve('hello');
                        }, 1000);

                        return deferred.promise;
                    };

                    $scope.courses.NUMBER_PER_PAGE = $scope.courses.rawData.length;
                    $scope.totalPages = 1;
                }, function (reason) {
                    console.error(reason);
                })
                ;
        });

        $scope.showDimmer = function ($event) {
            //$($event.target).closest('.dimmable').dimmer('show');
        };

        $scope.hideDimmer = function ($event) {
            $($event.currentTarget).dimmer('hide');
        };

        $scope.showSharingQRCode = function ($event) {
            $('.ui.modal.qrcode')
                .modal('show')
            ;
        };

        function CountDown(init) {
            this.value = init - (new Date());

            var self = this;
            this.start = function () {
                function countdown() {
                    self.value = init - (new Date());

                    $timeout(countdown, 1000);
                }

                countdown();
            };

            this.start();
        }
    }])
    .controller('FinishedCoursesCtrl', ['$scope', 'service', '$timeout', '$q', function ($scope, service, $timeout, $q) {

        $scope.fetching = false;
        $scope.courses = {rawData: []};
        service.executePromiseAvoidDuplicate($scope, 'fetching', function () {
            return service.get(angular.bplus.config.serviceUrls.studyCenter.classBooking.finished)
                .then(function (data) {
                    $scope.courses.rawData = data.bookings.map(function (d) {
                        return {
                            name: d.title,
                            teacher: d.description,
                            startAt: new Date(d.start_time),
                            endAt: new Date(d.end_time)
                        };
                    });

                    $scope.courses.getData = function () {
                        var deferred = $q.defer();

                        return deferred.promise;
                    };

                    $scope.courses.NUMBER_PER_PAGE = 10;
                    $scope.totalPages = data.total;

                    $timeout(function () {
                        $(function () {
                            $('td .rating')
                                .rating({})
                            ;
                        });
                    });
                });
        });
    }])
    .controller('FavTeachersCtrl', ['$scope', 'FileReaderService', 'service', function ($scope, FileReaderService, service) {
        $scope.teachers = [];
        $scope.fetching = false;
        service.executePromiseAvoidDuplicate($scope, 'fetching', function () {
            return service.get(angular.bplus.config.serviceUrls.studyCenter.my.favorite.teachers)
                .then(function (data) {
                    $scope.teachers = data.map(function (i) {
                        return {
                            name: i.display_name,
                            description: 'todo description',
                            title: 'todo title',
                            image: i.image_url,
                            topics: [{
                                title: 'todo title topic',
                                link: '',
                                target: ''
                            }, {
                                title: 'todo title topic',
                                link: '',
                                target: ''
                            }, {
                                title: 'todo title topic',
                                link: '',
                                target: ''
                            }]
                        }
                    });

                    $('* > .rating').rating({});
                });
        });
        //$scope.teachers = [{
        //    name: '钱申',
        //    description: '10年再线教育经验,港大MBA,复旦计算机硕士',
        //    title: '合得国际CTO',
        //    image: 'img/feedback/about-team-1.jpg',
        //    topics: [{
        //        title: '投行面试辅导',
        //        link: 'http://www.baidu.com',
        //        target: '_blank'
        //    }, {
        //        title: '如何做好电话销售',
        //        link: 'http://www.bing.com',
        //        target: '_blank'
        //    }, {
        //        title: '如何做好电话销售',
        //        link: 'http://www.google.com',
        //        target: '_blank'
        //    }],
        //    messages: [{
        //        text: '钱老师您好,我很喜欢您提到创业的梦想与现实 这一个部分,我现在也面临了是否要考研还是就 业的选择,不知道老师有没有什麽想法?',
        //        from: 'me'
        //    }, {
        //        text: '聊聊你现在对于创业的想法吧!',
        //        from: 'teacher'
        //    }, {
        //        text: '人一生中要扮演很多角色,如何积累其中的专业性呢?在商业性很强的职业上,我们有很多机会去培训练习和积累,也会有同事的指导和帮助。很多都是一次性的角色,经历过了会有很多好的经验和感受,但时间过去了就浪费了,而新演员又要重新摸索一次。如何有一个工具可以改善一次性角色的专业性?',
        //        from: 'me'
        //    }, {
        //        text: '建议你听听看Julia导师开的课 : )',
        //        from: 'teacher'
        //    }]
        //}, {
        //    name: '钱申',
        //    description: '10年再线教育经验,港大MBA,复旦计算机硕士',
        //    title: '合得国际CTO',
        //    image: 'img/feedback/about-team-1.jpg',
        //    topics: [{
        //        title: '投行面试辅导投行面试辅导投行面试辅导投行面试辅导投行面试辅导投行面试辅导投行面试辅导',
        //        link: 'http://www.baidu.com',
        //        target: '_blank'
        //    }, {
        //        title: '如何做好电话销售',
        //        link: 'http://www.bing.com',
        //        target: '_blank'
        //    }, {
        //        title: '如何做好电话销售',
        //        link: 'http://www.google.com',
        //        target: '_blank'
        //    }]
        //}, {
        //    name: '钱申',
        //    description: '10年再线教育经验,港大MBA,复旦计算机硕士',
        //    title: '合得国际CTO',
        //    image: 'img/feedback/about-team-1.jpg',
        //    topics: [{
        //        title: '投行面试辅导',
        //        link: 'http://www.baidu.com',
        //        target: '_blank'
        //    }, {
        //        title: '如何做好电话销售',
        //        link: 'http://www.bing.com',
        //        target: '_blank'
        //    }, {
        //        title: '如何做好电话销售',
        //        link: 'http://www.google.com',
        //        target: '_blank'
        //    }]
        //}];

        $scope.replyData = {
            text: '',
            pictures: []
        };

        $scope.picturesAdded = function (element) {
            function successCallback(i) {
                return function (result) {
                    $scope.replyData.pictures.push({
                        index: i,
                        picture: result
                    });
                };
            }

            function errorCallback(i) {
                return function (error) {
                    $scope.replyData.pictures.push({
                        index: i,
                        picture: null,
                        error: error
                    });
                };
            }

            for (var i = 0; i < element.files.length; i++) {
                FileReaderService.readAsDataUri(element.files[i], $scope)
                    .then(successCallback(i), errorCallback(i))
                ;
            }
        };

        $scope.removePicture = function (index) {
            $scope.replyData.pictures.splice(index, 1);
        };
    }])
;