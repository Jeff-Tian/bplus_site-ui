angular.module('studyCenterModule')
    .controller('ComingCoursesCtrl', ['$scope', '$timeout', '$q', 'service', function ($scope, $timeout, $q, service) {
        $scope.loading = false;

        $scope.courses = {
            rawData: []
        };

        $scope.getCourseStatus = function (registered, mincapability, startAt) {
            var now = new Date();

            if (now < startAt) {
                if (registered < mincapability) {
                    return '未开课';
                } else {
                    return '已开课';
                }
            } else {
                if (registered < mincapability) {
                    return '人数不足';
                } else {
                    return '已开课';
                }
            }
        };

        $scope.getCourseProgress = function (registered, mincapability, capability, startAt) {
            var status = $scope.getCourseStatus(registered, mincapability, startAt);

            return status === '人数不足' ? '开课失败' : registered + '/' + capability;
        };

        service.executePromiseAvoidDuplicate($scope, 'loading', function () {
            return service.get(angular.bplus.config.serviceUrls.studyCenter.classBooking.coming)
                .then(function (data) {
                    $scope.courses.displayData =
                        data.map(function (d) {
                            var courseStatus = $scope.getCourseStatus(d.bookingCount, d.mincapability, new Date(d.start_time));
                            var progress = $scope.getCourseProgress(d.bookingCount, d.mincapability, d.capability, new Date(d.start_time));

                            return {
                                name: d.title,
                                teacher: d.teacher.display_name,
                                status: Math.round(d.bookingCount / d.capability * 100),
                                statusText: [
                                    progress,
                                    courseStatus
                                ],
                                startAt: new Date(d.start_time),
                                endAt: new Date(d.end_time),
                                tags: d.teacher.tags.map(function (t) {
                                    return {
                                        text: t,
                                        special: false
                                    };
                                }),
                                class_id: d.class_id,
                                course_id: d.course_id,
                                teacherInfo: d.teacher
                            };
                        });

                    angular.forEach($scope.courses.displayData, function (value, key) {
                        value.countdown = new CountDown(new Date(value.startAt));
                    });
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
    .controller('FinishedCoursesCtrl', ['$scope', 'service', '$timeout', '$q', 'MessageBox', function ($scope, service, $timeout, $q, MessageBox) {
        function mapCourse(d) {
            return {
                name: d.title,
                teacher: d.description,
                startAt: new Date(d.start_time),
                endAt: new Date(d.end_time),
                generalEvaluation: d.general_evaluation,
                feedbackId: d.feedback_id,
                classId: d.class_id,
                teacherId: d.teacher_id,
                feedback: {
                    comment: '',
                    generalEvaluation: 0,
                    evaluations: {
                        '准时': 0,
                        '专业度': 0,
                        '通话质量': 0,
                        '态度': 0
                    }
                }
            };
        }

        $scope.fetching = false;

        var pageSize = 10;
        $scope.courses = new PaginationData('fetching', angular.bplus.config.serviceUrls.studyCenter.classBooking.unevaluated, pageSize, function (data) {
            var ret = data.bookings.map(mapCourse);

            $timeout(function () {
                $('.unrated form .rating').rating({
                    onRate: function (value) {
                        var $this = angular.element(this);
                        var cmd = '$this.scope().' + $this.attr('model') + ' = value';

                        eval(cmd); // jshint ignore : line

                        $this.scope().$apply();
                    }
                });
            });

            return ret;
        });

        $scope.fetchingRated = false;

        $scope.ratedCourses = new PaginationData('fetchingRated', angular.bplus.config.serviceUrls.studyCenter.classBooking.evaluated, pageSize, function (data) {
            return data.bookings.map(mapCourse);
        });

        function PaginationData(flag, dataSource, numberPerPage, gotData) {
            function getData(page) {
                return service.executePromiseAvoidDuplicate($scope, flag, function () {
                    return service.get(dataSource, {
                        params: {
                            pageSize: numberPerPage,
                            page: page
                        }
                    });
                });
            }

            this.rawData = [];
            this.displayData = [];
            this.NUMBER_PER_PAGE = numberPerPage;
            this.currentPage = 0;

            this.getData = function (page) {
                var self = this;

                return getData(page)
                    .then(function (data) {
                        self.rawData = new Array(data.total);
                        self.currentPage = data.currentPage;
                        self.displayData = gotData(data);
                    });
            };
        }

        $scope.showEvaluationDetail = function (c) {
            if (!c.evaluationDetail) {
                service.get(angular.bplus.config.serviceUrls.studyCenter.classFeedback.replace(':feedbackId', c.feedbackId))
                    .then(function (data) {
                        c.evaluationDetail = data;

                        $timeout(function () {
                            $('form .ui.grid .rating').rating('disable');
                        });
                    })
                ;
            }
        };

        $scope.countItems = function (o) {
            return Object.keys(o).length;
        };

        $scope.addingFeedback = false;
        $scope.addFeedback = function (course) {
            service.executePromiseAvoidDuplicate($scope, 'addingFeedback', function () {
                return service.put(angular.bplus.config.serviceUrls.studyCenter.teacher.feedback, {
                    class_id: course.classId,
                    comment: course.feedback.comment,
                    general_evaluation: course.feedback.generalEvaluation,
                    evaluation: course.feedback.evaluations
                }).then(function (data) {
                    console.log(data);
                    course.feedback.disabled = true;
                    MessageBox.show('评价成功');
                }, function (reason) {
                    MessageBox.show(reason.message);
                });
            });
        };

        $scope.canAddFeedback = function (course) {
            var can = course.feedback.comment && course.feedback.generalEvaluation;

            for (var key in course.feedback.evaluations) {
                can = can && course.feedback.evaluations[key];
            }

            return can;
        };
    }])
    .controller('FavTeachersCtrl', ['$scope', 'FileReaderService', 'service', 'MessageBox', '$timeout', function ($scope, FileReaderService, service, MessageBox, $timeout) {
        $scope.teachers = [];
        $scope.fetching = false;

        function getLatestCourses() {
            angular.forEach($scope.teachers, function (t, key) {
                service.get(angular.bplus.config.serviceUrls.studyCenter.teacher.latestCourses.replace(':teacherId', t.id)).then(function (data) {
                    t.courses = data;
                })
                ;
            });
        }

        function refreshTeachers() {
            service.executePromiseAvoidDuplicate($scope, 'fetching', function () {
                return service.get(angular.bplus.config.serviceUrls.studyCenter.my.favorite.teachers)
                    .then(function (data) {
                        $scope.teachers = data.map(function (i) {
                            return {
                                id: i.teacher_id,
                                name: i.display_name,
                                title: '',
                                image: i.image_url,
                                rank: i.rank,
                                tags: i.tags,
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
                            };
                        });

                        $timeout(function () {
                            $('* > .rating').rating('disable');

                            getLatestCourses();
                        });
                    });
            });
        }

        refreshTeachers();

        $scope.deleting = {};

        $scope.removeFavTeacher = function (t) {
            service.executePromiseAvoidDuplicate($scope.deleting, t.id, function () {
                return service.delete(angular.bplus.config.serviceUrls.studyCenter.my.favorite.teachers, {
                    params: {
                        teacher_id: t.id
                    }
                })
                    .then(function (data) {
                        //refreshTeachers();
                        for (var i = $scope.teachers.length - 1; i >= 0; i--) {
                            if ($scope.teachers[i].id === t.id) {
                                $scope.teachers.splice(i, 1);
                            }
                        }
                    }, function (reason) {
                        MessageBox.show(reason.message);
                    })
                    ;
            })
            ;
        };

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